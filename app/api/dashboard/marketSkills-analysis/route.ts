import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
})

export async function POST(req: NextRequest){
    const user = await currentLoggedInUserInfo();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userInfo = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            fullName: true,
            ownedSpaces: true,
            recentActivities: true,
            credits: true
        }
    });

    if (userInfo?.credits! < 35) {
        return NextResponse.json({ error: "Insufficient credits. Please purchase more credits to use this feature." }, { status: 402 });
    }

    const timelines = await prisma.timeline.findMany({
        where: {
            userId: user.id
        },
        include: {
            milestones: true
        }
    });

    const mainOnboardingData = await prisma.onboarding.findMany({
        where: {
            userId: user.id
        }
    })

    const milestones = await prisma.mileStone.findMany({
        where: {
            userId: user.id
        },
        include: {
            SubTask: true,
            Timeline: true,
            Reflection: true
        }
    });

    const prevAIInsights = await prisma.aIInsight.findMany({
        where: {
            userId: user.id
        }
    });

    const journals = await prisma.journal.findMany({
        where: {
            userId: user.id
        }
    });

    const isMarketSkillsAnalysisAlreadyDone = await prisma.marketSkillsAnalysis.findFirst({
        where: {
            userId: user.id
        }
    }); 
      
    let prevVersion;    
    if (isMarketSkillsAnalysisAlreadyDone) {
        prevVersion = isMarketSkillsAnalysisAlreadyDone.version;
    }

    let updatedNextVersion = "v1.0";
    if (prevVersion) {
        const versionNumber = parseFloat(prevVersion.replace('v', ''));
        const nextVersionNumber = (versionNumber + 0.1).toFixed(1);
        updatedNextVersion = `v${nextVersionNumber}`;
    }

    try {
        let todayDate = new Date().toISOString().split('T')[0];
        
        const prompt = `
Hey! I need you to analyze this user's skills and give them a super helpful market value breakdown. Think of it like you're their career-savvy friend giving them the inside scoop on what their skills are really worth.

USER'S CURRENT SITUATION:
- Learning progress from timelines and milestones
- Skill levels and learning patterns
- Previous career insights and reflections
- Current goals and aspirations

TODAY'S DATE: ${todayDate}

Here's what I want you to do:

1. Look at their current skills and figure out what they're really good at
2. Show them how much money each skill can add to their salary
3. Tell them which skills are hot right now and which are cooling down
4. Help them see the best skill combinations for maximum impact
5. Give them a clear action plan to level up their earning potential

Return everything in this exact JSON format - keep it casual and friendly like you're explaining it over coffee:

{
  "userSkills": {
    "currentStrengths": ["skill1", "skill2", "skill3"],
    "skillLevels": {"skill1": 85, "skill2": 70, "skill3": 60},
    "learningVelocity": {"averageWeeklyProgress": 15, "consistencyScore": 78}
  },
  "skillDemandData": {
    "highDemandSkills": [
      {"skill": "React", "demandScore": 92, "trend": "growing", "reason": "Every company needs frontend devs right now"},
      {"skill": "AWS", "demandScore": 88, "trend": "rapid_growth", "reason": "Cloud migration is huge in 2025"}
    ],
    "stableSkills": [
      {"skill": "JavaScript", "demandScore": 85, "trend": "stable", "reason": "Foundation skill, always needed"}
    ],
    "decliningSkills": [
      {"skill": "jQuery", "demandScore": 25, "trend": "declining", "reason": "Modern frameworks took over"}
    ]
  },
  "salaryImpactData": {
    "salaryBoosters": [
      {"skill": "System Design", "premium": "₹4-6L", "impact": "high", "reason": "Critical for senior roles and architecture positions"},
      {"skill": "AWS/Azure", "premium": "₹3-5L", "impact": "high", "reason": "Cloud skills are gold in today's market"}
    ],
    "foundationSkills": [
      {"skill": "JavaScript", "premium": "₹1-2L", "impact": "medium", "reason": "Expected baseline for most roles"}
    ]
  },
  "trendAnalysis": {
    "growingTrends": [
      {"area": "AI/ML Integration", "momentum": "high", "adoptionRate": "rapid", "whyImportant": "Companies are rushing to add AI features"}
    ],
    "futureOpportunities": [
      {"skill": "Web3 Development", "timeline": "12-18 months", "potential": "high", "reason": "Early adoption could pay off big"}
    ]
  },
  "skillGapValue": {
    "highValueGaps": [
      {"skill": "System Design", "currentLevel": 40, "targetLevel": 80, "valueIncrease": "₹5-7L", "timeline": "3-4 months"}
    ],
    "quickWins": [
      {"skill": "TypeScript", "currentLevel": 50, "targetLevel": 75, "valueIncrease": "₹2-3L", "timeline": "6-8 weeks"}
    ]
  },
  "learningROI": {
    "bestInvestments": [
      {"skill": "AWS Certification", "timeRequired": "4-6 weeks", "salaryBoost": "₹3-4L", "roiScore": 95},
      {"skill": "React Advanced", "timeRequired": "8-10 weeks", "salaryBoost": "₹2-3L", "roiScore": 85}
    ]
  },
  "optimalCombinations": {
    "powerCombos": [
      {"combo": "React + Node.js + MongoDB", "marketValue": "₹18-24L", "demand": "very_high", "whyItWorks": "Full stack versatility is always in demand"},
      {"combo": "Python + Django + AWS", "marketValue": "₹16-22L", "demand": "high", "whyItWorks": "Great for backend and startup roles"}
    ]
  },
  "opportunityCost": {
    "timeVsValue": [
      {"skill": "Learning new framework", "timeInvestment": "8 weeks", "expectedReturn": "₹2-3L", "priority": "medium"},
      {"skill": "Mastering system design", "timeInvestment": "12 weeks", "expectedReturn": "₹5-6L", "priority": "high"}
    ]
  },
  "personalizedInsights": {
    "keyTakeaways": [
      "Your React skills are solid - focus on advanced patterns to get that salary bump",
      "System design is your biggest opportunity right now - it's what separates mid-level from senior",
      "Consider adding AWS to your toolkit - cloud skills are like career insurance"
    ],
    "immediateActions": [
      "Spend 2 hours weekly on system design practice",
      "Start a small project using TypeScript to learn gradually",
      "Follow 3 cloud experts on Twitter for daily insights"
    ]
  },
  "recommendationEngine": {
    "skillPriorities": [
      {"skill": "System Design", "priority": "high", "reason": "Biggest impact on your earning potential"},
      {"skill": "TypeScript", "priority": "medium", "reason": "Modern codebases are switching to TS"},
      {"skill": "AWS Basics", "priority": "medium", "reason": "Cloud knowledge is becoming mandatory"}
    ]
  },
  "successPatterns": {
    "whatWorks": [
      "People who combined frontend + backend skills got 30% higher offers",
      "Those with cloud certifications saw faster career progression",
      "Developers who documented their learning journey stood out in interviews"
    ]
  },
  "riskAssessment": {
    "marketRisks": [
      {"risk": "Over-specializing in niche tech", "impact": "medium", "mitigation": "Keep learning transferable skills"},
      {"risk": "Ignoring AI tools", "impact": "high", "mitigation": "Start experimenting with AI APIs"}
    ]
  },
  "chartData": {
    "skillValueChart": {
      "labels": ["React", "Node.js", "System Design", "AWS", "TypeScript"],
      "values": [85, 70, 40, 25, 50],
      "marketDemand": [92, 88, 95, 90, 85]
    },
    "salaryImpactChart": {
      "skills": ["JavaScript", "React", "Node.js", "System Design", "AWS"],
      "salaryAdd": [2, 4, 3, 6, 5]
    }
  },
  "heatmapData": {
    "skillDemandHeatmap": {
      "frontend": {"React": 95, "Vue": 70, "Angular": 60},
      "backend": {"Node.js": 90, "Python": 85, "Java": 80},
      "cloud": {"AWS": 92, "Azure": 85, "GCP": 80}
    }
  },
  "comparisonData": {
    "peerComparison": {
      "yourLevel": {"React": 85, "Node.js": 70, "SystemDesign": 40},
      "averageLevel": {"React": 75, "Node.js": 65, "SystemDesign": 35},
      "targetLevel": {"React": 90, "Node.js": 80, "SystemDesign": 75}
    }
  },
  "projectionData": {
    "sixMonthProjection": {
      "currentValue": "₹12-15L",
      "projectedValue": "₹18-22L",
      "keyDrivers": ["System Design improvement", "AWS skills", "TypeScript adoption"]
    }
  }
}

IMPORTANT: Return ONLY valid JSON without any additional text or markdown. Base your analysis on the user's current skill levels, learning pace, and career aspirations. Make the predictions realistic and actionable.

Remember: Keep it real, keep it helpful, and make sure they walk away knowing exactly what to do next to level up their career. Use 2025 market data and make it feel current and accurate.
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

        const aiResponse = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanedMessage = aiResponse.replace(/```json|```/g, '').trim();
        const parsedResponse = JSON.parse(cleanedMessage);


        const marketAnalysis = await prisma.marketSkillsAnalysis.create({
            data: {
                userId: user.id,
                userSkills: parsedResponse.userSkills,
                skillLevels: parsedResponse.userSkills.skillLevels,
                learningVelocity: parsedResponse.userSkills.learningVelocity,
                skillDemandData: parsedResponse.skillDemandData,
                salaryImpactData: parsedResponse.salaryImpactData,
                trendAnalysis: parsedResponse.trendAnalysis,
                geographyData: parsedResponse.heatmapData,
                skillGapValue: parsedResponse.skillGapValue,
                learningROI: parsedResponse.learningROI,
                optimalCombinations: parsedResponse.optimalCombinations,
                opportunityCost: parsedResponse.opportunityCost,
                chartData: parsedResponse.chartData,
                heatmapData: parsedResponse.heatmapData,
                comparisonData: parsedResponse.comparisonData,
                projectionData: parsedResponse.projectionData,
                personalizedInsights: parsedResponse.personalizedInsights,
                recommendationEngine: parsedResponse.recommendationEngine,
                successPatterns: parsedResponse.successPatterns,
                riskAssessment: parsedResponse.riskAssessment,
                version: updatedNextVersion
            }
        });

         await prisma.user.update({
            where: { id: user.id },
            data: { credits: { decrement: 35 } }
        });

        await prisma.notification.create({
            data: {
                userId: user.id,
                type : 'INFO',
                message: `35 credits have been deducted for generating a market skills analysis.`,
                title: 'Market Skills Analysis Generated',
            }
        })

        await prisma.creditUsage.create({
            data : {
              userId: user.id,
              creditsUsed: 35,
              type: "Market Skills Analysis",
              description: `Deducted 35 credits for generating market skills analysis.`,
            }
        })

     return NextResponse.json({
        message : 'Market skills analysis generated successfully',
     }, {status: 201})


    } catch (error) {
        console.log('Error in market skills analysis route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}