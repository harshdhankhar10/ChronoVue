import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
import prisma from "@/lib/prisma";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
})

export async function POST(req: NextRequest) {
    const user = await currentLoggedInUserInfo();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user?.credits < 25) {
        return NextResponse.json({ error: "Insufficient credits. AI services require at least 25 credits." }, { status: 402 });
    }

    if (!GEMINI_API_KEY) {
        return NextResponse.json({ error: 'AI service currently unavailable' }, { status: 503 });
    }
    const { timelineID, additionalContext } = await req.json();
    try {
        let timelineInfo = await prisma.timeline.findUnique({
            where: { id: timelineID },
            include: {
                milestones: true,
            }
        })

        let todayDate = new Date().toISOString().split('T')[0];

        if(timelineInfo?.ai_suggestions.map((sug: any) => sug.date).includes(todayDate)){
            return NextResponse.json({ error: 'Sorry Dear! You can only generate one AI suggestion per day. Please try again tomorrow.'}, { status: 429 });
        }
            

        const prompt = `
           
        You are an AI assistant reviewing a user's AI-focused future timeline, including their existing milestones and optional additional context. Your role is to analyze the timeline and generate a **high-quality, meaningful, and realistic milestone suggestion** that fits naturally within the user's current progression.

Please act like a human expert with experience in technology forecasting and future planning. Be thoughtful, constructive, and professional — but still approachable and clear in your tone.

Before generating your suggestion, carefully analyze the user's existing timeline. Look for patterns, gaps, or trends that can inform a relevant and impactful milestone. Consider the user's goals, the current state of technology, and realistic future developments.
User previously data is : ${JSON.stringify(timelineInfo)}

so analyze the above data and provide a meaningful milestone suggestion.
When crafting your response, consider:
- Patterns, gaps, or trends in the user's existing timeline.
- Opportunities for impactful future milestones.
- What makes the suggestion realistic and relevant.
- A brief personal opinion or rationale for why the suggestion matters.
- Avoid overly optimistic or vague predictions.
- Analyzing the current market, technology trends, and societal shifts to ground your suggestions in reality.
- Give the true brutal honest truth, not what the user wants to hear.

 user's provided additional context is: ${additionalContext || 'N/A'}
  If additional context is provided, integrate it thoughtfully into your analysis.

  if the additional context you thinks is irrelevant to the timeline, you must ignore the additional context(strictly follow this instruction).

📌 Return your response strictly in the following JSON format:

{
  "suggestionID": "[a randomly generated short numeric ID (12 digits combination of numbers, letters)]",
  "content": "[A clear and concise milestone suggestion based on the user's timeline]",
  "whatToDo": "[Actionable advice or next steps the user should consider, give it in array format, do not give more then 5 points and be well explained so that user can understand]",
  "whatNotToDo": "[What the user should avoid or be cautious about, give it in array format, do not give more then 5 points and be well explained so that user can understand]",
  "date": "in this include the today's date in this format YYYY-MM-DD",
  "personalOpinion": "[A short and insightful opinion or rationale about why this milestone is valuable or interesting, in engagging, realtic and professional tone and like in 5-6 sentences and you can 
  use more sentences or maybe less depends on the context an user previously provided]"
}

Return only the JSON and nothing else. Do not include preambles, explanations, or commentary. Focus on making the suggestion sound human, expert, and helpful.

        `

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ]
        })

        const aiMessage = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanedMessage = aiMessage.replace(/```json|```/g, '').trim();
        const parsedMessage = JSON.parse(cleanedMessage);
        let date = new Date();
        
        const formattedDate = date.toISOString().split('T')[0];
        parsedMessage.date = formattedDate;


        await prisma.timeline.update({
            where: { id: timelineID },
            data : {
                ai_suggestions: {
                    push: parsedMessage
                }
            }
        })
        await prisma.user.update({
            where: { id: user.id },
            data: {
                credits : {decrement: 25}
            }
        });
        await prisma.creditUsage.create({
            data: {
                userId: user.id,
                creditsUsed: 25,
                type : 'AI_SUGGESTION',
                description: `Used 25 credits for AI suggestion on timeline ID: ${timelineID}`
            }
        })

        await prisma.notification.create({
            data : {
                userId: user.id,
                title: 'AI Suggestion Generated',
                message: `25 credits have been deducted for generating an AI suggestion on your timeline.`,
            }
        })

        return NextResponse.json({ message: 'AI suggestion generated successfully'}, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to generate AI suggestions' }, { status: 500 });
    }
}