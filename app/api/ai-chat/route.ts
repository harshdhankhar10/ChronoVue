import { NextRequest, NextResponse } from "next/server";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
    const user = await currentLoggedInUserInfo();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { message, context, chatHistory } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const userInfo = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                Timeline: { include: { milestones: true } },
                MileStone: true,
                Journal: true,
                ownedSpaces: true,
                AIInsights: { orderBy: { createdAt: 'desc' }, take: 1 },
                Profile: true,
                Onboarding: true,
            }
        });

        if (!userInfo) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (userInfo.credits < 5) {
            const res = await prisma.notification.create({
                data : {
                    userId: user.id,
                    title: 'Insufficient Credits',
                    message: 'You must have at least 5 credits to use the AI Assistant',
                }
            })
            return NextResponse.json({ error: 'Insufficient credits' }, { status: 400 });
        }

        const userData = {
            profile: {
                name: userInfo.fullName,
                skills: userInfo.Profile?.skills,
                careerStage: userInfo.Profile?.careerStage
            },
            goals: {
                primaryGoal: userInfo.Onboarding?.primaryGoalCategory,
                topGoals: userInfo.Onboarding?.topGoals,
                timeHorizon: userInfo.Onboarding?.timeHorizon
            },
            progress: {
                totalMilestones: userInfo.MileStone.length,
                completedMilestones: userInfo.MileStone.filter(m => m.status === 'COMPLETED').length,
                activeTimelines: userInfo.Timeline.length,
                latestInsight: userInfo.AIInsights[0]
            },
            currentContext: context
        };

        const prompt = `
You are ChronoAI, a professional career and personal growth assistant. Analyze the user's data and provide helpful, actionable advice.

USER DATA:
${JSON.stringify(userData, null, 2)}

CHAT HISTORY:
${JSON.stringify(chatHistory || [], null, 2)}

CURRENT MESSAGE: "${message}"

CURRENT CONTEXT: ${context}

Provide a structured JSON response with this exact format:
{
  "response": "Your helpful response here. Be specific, actionable, and reference their data when relevant. Keep it professional but friendly.",
  "suggestedActions": ["Action 1", "Action 2", "Action 3"],
  "confidence": 85,
  "needsClarification": false
}

Guidelines:
    - Focus on career growth, skill development, and goal achievement
    - Be specific and reference their actual data when possible
    - Provide actionable steps, not just advice
    - If unclear, ask for clarification but try to be helpful
    - Keep responses concise but comprehensive
    - Never provide medical, financial, or legal advice
    - Stay within the context of personal and professional development
    - If user trys to harass you, you must ignore the message and do not respond to it.
`;

        const aiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ]
        });

        const responseText = aiResponse.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanedMessage = responseText.replace(/```json|```/g, '').trim();
        const parsedResponse = JSON.parse(cleanedMessage);

        await prisma.user.update({
            where: { id: user.id },
            data: { credits: { decrement: 5 } }
        });

        await prisma.creditUsage.create({
            data : {
                userId: user.id,
                creditsUsed: 5,
                type : 'AI_CHAT',
                description: 'Credits used for AI Chat interaction'
            }
        })


        return NextResponse.json({
            success: true,
            data: parsedResponse,
            creditsUsed: 5,
            creditsRemaining: userInfo.credits - 5
        });

    } catch (error) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}