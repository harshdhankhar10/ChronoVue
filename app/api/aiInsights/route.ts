import { NextRequest, NextResponse } from "next/server";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
})

enum GenerationTrigger{
    USER_ACTION = 'USER_ACTION',
    SCHEDULED_GENERATION = 'SCHEDULED_GENERATION',
    SYSTEM_AUTO_GENERATION = 'SYSTEM_AUTO_GENERATION',
}

export async function POST(req: NextRequest){
    const user = await currentLoggedInUserInfo();
    if(!user){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    try {
        const {generationMethod} = await req.json();
        if(generationMethod !== 'USER_ACTION'){
            return NextResponse.json({error: 'This action is not allowed'}, {status: 400});
        }
        let userInfo = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                Timeline: { include: { milestones: true } },
                MileStone: true,
                Journal: true,
                ownedSpaces: true,
                AIInsights: { orderBy: { createdAt: 'desc' } },
                Profile: true,
                Onboarding: true,
            }
        })

        const communitySpaces = await prisma.communitySpace.findMany({
            where: { members: { some: { userId: user.id } } }
        })

        const prevAIInsights = userInfo?.AIInsights || [];

        if(!userInfo){
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }
        if(userInfo.Timeline.length === 0){
            return NextResponse.json({error: 'Minimum 1 timeline is required'}, {status: 400});
        }
        if(userInfo.MileStone.length < 3){
            return NextResponse.json({error: 'At least 3 milestones are required'}, {status: 400});
        }
        if(userInfo.Journal.length < 2){
            return NextResponse.json({error: 'At least 2 journal entries are required'}, {status: 400});
        }
        if(userInfo.credits < 50){
            return NextResponse.json({error: 'You must have at least 50 credits'}, {status: 400});
        }

        const lastInsight = userInfo.AIInsights[0];
        if(lastInsight){
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            if(lastInsight.createdAt > sevenDaysAgo){
                return NextResponse.json({error: 'You can only generate insights once every 7 days'}, {status: 400});
            }
        }

        const userData = {
            profile: {
                name: userInfo.fullName,
                headline: userInfo.Profile?.headline,
                skills: userInfo.Profile?.skills,
                careerStage: userInfo.Profile?.careerStage
            },
            goals: {
                primaryGoal: userInfo.Onboarding?.primaryGoalCategory,
                topGoals: userInfo.Onboarding?.topGoals,
                timeHorizon: userInfo.Onboarding?.timeHorizon
            },
            timelines: userInfo.Timeline.map(timeline => ({
                name: timeline.name,
                category: timeline.category,
                startDate: timeline.startDate,
                endDate: timeline.endDate,
                milestones: timeline.milestones?.map(m => ({
                    title: m.title,
                    status: m.status,
                    priority: m.priority,
                    targetDate: m.targetDate
                }))
            })),
            milestones: userInfo.MileStone.map(milestone => ({
                title: milestone.title,
                status: milestone.status,
                priority: milestone.priority,
                targetDate: milestone.targetDate,
                createdAt: milestone.createdAt
            })),
            journals: userInfo.Journal.map(journal => ({
                title: journal.title,
                content: journal.content,
                mood: journal.mood,
                createdAt: journal.createdAt
            })),
            community: {
                spaces: communitySpaces.map(space => space.name),
                ownedSpaces: userInfo.ownedSpaces.map(space => space.name)
            },
            prevAIInsights: prevAIInsights.map(insight => ({
                title: insight.title,
                type: insight.type,
                period: insight.period,
                createdAt: insight.createdAt
            }))
        }

   

        const insightTypes = [
            'CAREER',
            'EDUCATION',
            'HEALTH',
            'FINANCE',
            'PERSONAL_GROWTH',
            'ENTREPRENEURSHIP',
        ]

        const timelineCategories = [
            'CAREER',
            'EDUCATION',
            'PERSONAL',
            'FITNESS',
            'FINANCE',
            'ENTREPRENEURSHIP',
        ]

        const prompt = `
Analyze this user's career and personal development data to provide comprehensive AI insights. Use simple, clear language that's easy to understand.

USER DATA:
${JSON.stringify(userData, null, 2)}

Generate a JSON response with this exact structure:
{
  "title": "Create an engaging title for the insight report",
  "type": "Choose from: ${insightTypes.join(', ')}",
  "summary": "Write a 2-3 paragraph executive summary of the user's overall progress and key findings",
  "keyFindings": [
    {
      "title": "Finding title",
      "description": "Clear description of what you found",
      "trend": "positive/negative/neutral",
      "impact": "high/medium/low",
      "metric": "Specific metric or percentage",
      "dataPoints": ["data point 1", "data point 2"]
    }
  ],
  "recommendations": [
    {
      "title": "Actionable recommendation title",
      "description": "Clear step-by-step description",
      "priority": "high/medium/low",
      "category": "${timelineCategories.join(', ')}",
      "impact": "Describe the expected impact",
      "effort": "low/medium/high",
      "timeline": "When to complete this",
      "resources": ["resource 1", "resource 2"],
      "relatedMilestones": ["milestone 1", "milestone 2"]
    }
  ],
  "riskAnalysis": [
    {
      "risk": "Clear risk description",
      "severity": "high/medium/low",
      "probability": "likely/possible/unlikely",
      "impact": "What could happen",
      "mitigation": "How to address it"
    }
  ],
  "skillGaps": [
    {
      "skill": "Missing skill name",
      "importance": "critical/high/medium",
      "estimatedLearningTime": "X weeks/months",
      "relevance": "Why this matters for their goals"
    }
  ],
  "confidence": 85
}

Focus on:
1. Progress towards their main goals
2. Skill development patterns
3. Productivity and consistency
4. Community engagement value
5. Realistic timeline assessment
6. Actionable next steps

Keep language positive, motivating, and practical. Avoid technical jargon.
`

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ]
        });

        const aiResponse = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const cleanedMessage = aiResponse.replace(/```json|```/g, '').trim();
            const parsedResponse = JSON.parse(cleanedMessage);


        let generationTrigger = "SYSTEM_AUTO_GENERATION";

        if(generationMethod === 'USER_ACTION'){
            generationTrigger = 'USER_ACTION';
        }

        const newInsight = await prisma.aIInsight.create({
            data: {
                userId: user.id,
                title: parsedResponse.title,
                type: parsedResponse.type,
                period: new Date().toISOString().split('T')[0],
                generationTrigger: generationTrigger as GenerationTrigger,
                dataSnapshot: userData,
                dataSources: {
                    timelines: userInfo.Timeline.length,
                    milestones: userInfo.MileStone.length,
                    journals: userInfo.Journal.length,
                    communitySpaces: communitySpaces.length
                },
                summary: parsedResponse.summary,
                keyFindings: parsedResponse.keyFindings,
                confidence: parsedResponse.confidence,
                recommendations: parsedResponse.recommendations,
                riskAnalysis: parsedResponse.riskAnalysis,
                skillGaps: parsedResponse.skillGaps,
                totalActionItems: parsedResponse.recommendations.length,
                creditsUsed: 50
            }
        });

        await prisma.user.update({
            where: { id: user.id },
            data: {
                credits: { decrement: 50 },
            }
        });

            await prisma.notification.create({
                data : {
                    userId: user.id,
                    title: generationMethod === 'USER_ACTION' ? 'AI Insight Generated' : 'Weekly AI Insight Generated',
                    message: generationMethod === 'USER_ACTION' ? `Your AI Insight has been generated successfully. You have ${userInfo.credits - 50} credits remaining.` : `Your weekly AI Insight has been generated successfully. You have ${userInfo.credits - 50} credits remaining.`,
                }
            })
        
        

        if(userInfo.credits < 50){
            await prisma.notification.create({
                data : {
                    userId: user.id,
                    title: 'Insufficient Credits',
                    message: 'You must have at least 50 credits to generate insights',
                }
            })
        }

        

        return NextResponse.json({ 
            message: 'AI Insight generated successfully',
        }, {status: 201});

    } catch (error) {
        console.log('AI Insight Generation Error:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}