import { NextResponse, NextRequest } from "next/server";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
    const user = await currentLoggedInUserInfo();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if(user.credits < 5){
        return NextResponse.json({ error: "Insufficient credits. AI services require at least 5 credits." }, { status: 402 });
    }

    try {
        const { message, prediction } = await req.json();

        const prompt = `
You are ChronoVue AI Career Assistant. Your role is to help users understand their career analysis and provide guidance based on their specific data.

USER'S CAREER PREDICTION DATA:
${JSON.stringify(prediction, null, 2)}

USER'S QUESTION: "${message}"

INSTRUCTIONS:
1. Answer ONLY based on the provided career prediction data
2. Keep responses concise and actionable (max 3-4 sentences)
3. Focus on practical advice and next steps
4. If the question is outside career context, politely redirect to career topics
5. Use specific numbers and data from the prediction when relevant
6. Maintain encouraging and professional tone

RESPOND ONLY WITH THE ANSWER TEXT, no additional formatting or explanations.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ]
        });

        const aiResponse = response.candidates?.[0]?.content?.parts?.[0]?.text || 'I understand your question about career development. Based on your analysis, I recommend focusing on the high-priority actions in your plan.';

        await prisma?.user.update({
            where: { id: user.id },
            data: {
                credits : {decrement: 5}
            }
        });

        await prisma?.creditUsage.create({
            data: {
                userId: user.id,
                creditsUsed: 5,
                type : "CAREER_PREDICTOR_AI_CHAT",
                description: "Used 5 credits for Career Predictor AI Chat response"
            }
        });

        return NextResponse.json({
            message : "Response generated successfully",
            response: aiResponse,

        }, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}