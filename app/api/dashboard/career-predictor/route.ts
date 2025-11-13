import { NextResponse, NextRequest } from "next/server";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
})

export async function POST(req: NextRequest) {
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

    if (userInfo?.credits! < 100) {
        return NextResponse.json({ error: "Insufficient credits. Please purchase more credits to use the Career Predictor feature." }, { status: 402 });
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

    const isCarrerPredictorAlreadyDone = await prisma.aICareerPredictor.findFirst({
        where: {
            userId: user.id
        }
    });

    const lastPrediction = await prisma.aICareerPredictor.findFirst({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (lastPrediction) {
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        if (Date.now() - new Date(lastPrediction.createdAt).getTime() < thirtyDaysInMs) {
            return NextResponse.json({ error: "You can only generate a new prediction every 30 days." }, { status: 429 });
        }
    }

    let prevVersion;
    if (isCarrerPredictorAlreadyDone) {
        prevVersion = isCarrerPredictorAlreadyDone.predictionVersion;
    }

    let updatedNextVersion;
    if (prevVersion) {
        const versionNumber = parseFloat(prevVersion.replace('v', ''));
        const nextVersionNumber = (versionNumber + 0.1).toFixed(1);
        updatedNextVersion = `v${nextVersionNumber}`;
    }


    try {
        const {
            careerGoal,
            programmingLevel,
            frontendLevel,
            backendLevel,
            weeklyHours,
            learningStyle,
            timeline,
            targetRoles,
            companyPreference,
            salaryExpectation,
            additionalInfo
        } = await req.json();

        const onboardingData = `
Career Goal: ${careerGoal}
Programming Level: ${programmingLevel}
Frontend Level: ${frontendLevel}
Backend Level: ${backendLevel}
Weekly Hours: ${weeklyHours}
Learning Style: ${learningStyle}
Timeline: ${timeline}
Target Roles: ${targetRoles.join(", ")}
Company Preference: ${companyPreference}
Salary Expectation: ${salaryExpectation}
Additional Info: ${additionalInfo}
`;

let todayDate = new Date().toISOString().split('T')[0];

        const prompt = `
You are an AI Career Coach analyzing a user's career trajectory. Based on the user's onboarding data, learning patterns, and career goals, generate a comprehensive career prediction.

USER DATA:
${onboardingData}

USER'S EXISTING PROGRESS:
- Timelines: ${timelines.length} active timelines
- Milestones: ${milestones.length} milestones with ${milestones.filter(m => m.status === 'COMPLETED').length} completed
- Journals: ${journals.length} reflection entries
- Previous AI Insights: ${prevAIInsights.length} historical insights

ANALYZE AND GENERATE A COMPREHENSIVE CAREER PREDICTION WITH THIS EXACT JSON STRUCTURE:
I HAVE PROVIDED A SAMPLE BELOW, IF YOU THINK LIKE IN THIS SPECIFIC NEEDS MORE EXMAPLANTION SO FEEL FREE TO PROVIDE
MORE DETAILED INSIGHTS BASED ON THE USER DATA. BUT MAKE SURE THE FINAL OUTPUT IS IN THE BELOW JSON FORMAT ONLY.
THE INDEPTH ANALYSIS YOU PROVIDE WILL HELP THE USER TO UNDERSTAND THEIR CAREER PATH BETTER AND TAKE ACTIONABLE STEPS TOWARDS THEIR GOALS.
MAKE SURE THE DATES AND NUMBERS YOU PROVIDE ARE REALISTIC AND ACTIONABLE.
THE DATA MUST NOT BE GENERIC. BASE IT ON THE USER'S CURRENT SKILL LEVELS, LEARNING PACE, AND CAREER ASPIRATIONS.

Today Date: ${todayDate}, so CALCULATE DATES ACCORDINGLY.

{
  "currentTimeline": 4.2,
  "optimizedTimeline": 3.1,
  "confidenceScore": 0.85,
  "jobReadyDate": "2025-03-15T00:00:00.000Z",
  
  "timelineComparison": {
    "currentPath": ["Learn React Basics", "Build Projects", "Interview Prep", "Job Search"],
    "optimizedPath": ["Learn React + Build Mini Projects", "System Design Basics", "Mock Interviews", "Targeted Applications"],
    "weeksSaved": 5,
    "keyOptimizations": ["Parallel learning", "Early interview practice", "Focused project work"]
  },
  
  "daysSaved": {
    "totalDays": 33,
    "breakdown": {
      "learningEfficiency": 12,
      "projectOptimization": 8,
      "interviewPrep": 7,
      "jobSearch": 6
    }
  },
  
  "paceAnalysis": {
    "learningVelocity": 8.2,
    "consistencyScore": 72,
    "weeklyProgressRate": 18,
    "optimalWeeklyTarget": 25,
    "improvementAreas": ["Wednesday productivity", "Evening study consistency"]
  },
  
  "skillsRadarData": {
    "radarChart": {
      "labels": ["JavaScript", "React", "System Design", "AWS", "Testing", "Node.js"],
      "currentLevels": [80, 90, 40, 20, 50, 65],
      "targetLevels": [95, 98, 85, 70, 80, 85]
    },
    "progressBars": [
      {"skill": "JavaScript", "current": 80, "target": 95, "priority": "Medium"},
      {"skill": "React", "current": 90, "target": 98, "priority": "Low"},
      {"skill": "System Design", "current": 40, "target": 85, "priority": "High"},
      {"skill": "AWS", "current": 20, "target": 70, "priority": "High"},
      {"skill": "Testing", "current": 50, "target": 80, "priority": "Medium"}
    ],
    "skillMatrix": {
      "frontend": {"current": 85, "target": 96},
      "backend": {"current": 45, "target": 78},
      "devops": {"current": 20, "target": 60},
      "softSkills": {"current": 70, "target": 85}
    }
  },
  
  "skillProgression": {
    "monthlyProjection": [
      {"month": "Current", "frontend": 70, "backend": 45, "devops": 20, "softSkills": 60},
      {"month": "+1 Month", "frontend": 80, "backend": 55, "devops": 30, "softSkills": 65},
      {"month": "+2 Months", "frontend": 88, "backend": 68, "devops": 45, "softSkills": 75},
      {"month": "Job Ready", "frontend": 92, "backend": 75, "devops": 60, "softSkills": 85}
    ]
  },
  
  "riskAssessment": {
    "highRisks": [
      {
        "risk": "System Design Knowledge Gap",
        "impact": "Blocks 80% of top company interviews",
        "probability": 70,
        "mitigation": "Daily 2-hour practice + build 1 real system",
        "timeline": "3 weeks"
      }
    ],
    "mediumRisks": [
      {
        "risk": "Limited Professional Network",
        "impact": "Reduces referral opportunities by 60%",
        "probability": 60,
        "mitigation": "Attend 2 meetups monthly + LinkedIn outreach",
        "timeline": "4 weeks"
      }
    ]
  },
  
  "successProbability": {
    "overallScore": 78,
    "factors": [
      {"factor": "Learning Velocity", "score": 8, "weight": 25},
      {"factor": "Project Quality", "score": 7, "weight": 20},
      {"factor": "Consistency", "score": 6, "weight": 15},
      {"factor": "Network Strength", "score": 4, "weight": 15},
      {"factor": "Interview Readiness", "score": 5, "weight": 25}
    ]
  },
  
  "careerPathScenarios": [
    {
      "path": "Frontend Specialist",
      "timeline": 2.3,
      "salary": {"min": 10, "max": 15, "avg": 12},
      "probability": 78,
      "skills": ["React", "TypeScript", "UI/UX"],
      "lifestyle": "Better work-life balance",
      "growth": "Steady 15% YoY"
    },
    {
      "path": "Full Stack Developer",
      "timeline": 3.1,
      "salary": {"min": 15, "max": 22, "avg": 18},
      "probability": 85,
      "skills": ["React", "Node", "AWS", "DB"],
      "lifestyle": "Higher pressure, more opportunities", 
      "growth": "Rapid 25% YoY"
    }
  ],
  
  "salaryProjections": [
    {
      "role": "Frontend Developer",
      "current": {"min": 6, "max": 10, "avg": 8},
      "afterOptimization": {"min": 12, "max": 18, "avg": 15},
      "sixMonthsExperience": {"min": 15, "max": 22, "avg": 18}
    },
    {
      "role": "Full Stack Developer", 
      "current": {"min": 8, "max": 12, "avg": 10},
      "afterOptimization": {"min": 15, "max": 22, "avg": 18},
      "sixMonthsExperience": {"min": 18, "max": 28, "avg": 23}
    }
  ],
  
  "companyTargets": [
    {
      "tier": "Tier 1 - Dream Companies",
      "companies": ["Google", "Microsoft", "Amazon"],
      "readiness": 60,
      "timeline": "4-6 months",
      "preparation": ["Advanced System Design", "Competitive Programming"]
    },
    {
      "tier": "Tier 2 - Great Opportunities", 
      "companies": ["Flipkart", "Razorpay", "Swiggy"],
      "readiness": 75,
      "timeline": "2-3 months",
      "preparation": ["Solid Projects", "Good System Design"]
    }
  ],
  
  "roleMatches": [
    {
      "role": "Frontend Developer",
      "match": 92,
      "salary": {"min": 12, "max": 18, "avg": 15},
      "demand": "Very High",
      "skills": ["React", "JavaScript", "CSS", "TypeScript"]
    },
    {
      "role": "Full Stack Engineer",
      "match": 85, 
      "salary": {"min": 15, "max": 22, "avg": 18},
      "demand": "High",
      "skills": ["React", "Node.js", "MongoDB", "AWS"]
    }
  ],
  
  "skillGaps": [
    {
      "skill": "System Design",
      "currentLevel": 40,
      "targetLevel": 85,
      "priority": "Very High",
      "impact": "Critical for interviews",
      "resources": ["Grokking System Design", "System Design Primer"]
    },
    {
      "skill": "AWS",
      "currentLevel": 20,
      "targetLevel": 70,
      "priority": "High", 
      "impact": "Required for full-stack roles",
      "resources": ["AWS Cloud Practitioner", "Serverless Framework"]
    }
  ],
  
  "whatToDos": [
    "Build 2 full-stack projects with React & Node.js",
    "Practice System Design daily for 2 hours",
    "Start mock interviews from week 3",
    "Network with 5 senior developers monthly"
  ],
  
  "whatNotToDos": [
    "Don't jump between multiple technologies",
    "Avoid theoretical learning without projects", 
    "Don't delay interview preparation",
    "Avoid isolated learning without community"
  ],
  
  "successFactors": [
    {
      "factor": "Learning Velocity",
      "score": 8,
      "weight": 25,
      "description": "How quickly you absorb new concepts",
      "improvement": "Maintain current pace"
    },
    {
      "factor": "Project Quality",
      "score": 7,
      "weight": 20,
      "description": "Complexity and relevance of your projects",
      "improvement": "Add 2 more full-stack projects"
    }
  ],
  
  "actionPlan": {
    "highPriority": [
      {
        "task": "Build 2 full-stack projects with React & Node.js",
        "timeline": "4 weeks",
        "impact": "High",
        "effort": "Medium",
        "description": "E-commerce app and social media platform"
      }
    ],
    "mediumPriority": [
      {
        "task": "Complete AWS Cloud Practitioner certification",
        "timeline": "3 weeks", 
        "impact": "Medium",
        "effort": "Medium",
        "description": "Understand cloud concepts and basic AWS services"
      }
    ]
  },
  
  "marketInsights": {
    "skillDemand": [
      {"skill": "React", "demand": 85, "salary": 18, "trend": "rising"},
      {"skill": "Node.js", "demand": 75, "salary": 16, "trend": "stable"},
      {"skill": "AWS", "demand": 80, "salary": 22, "trend": "rising"}
    ],
    "hiringTrends": {
      "frontend": {"q1": 1200, "q2": 1400, "q3": 1600, "q4": 1800},
      "fullstack": {"q1": 900, "q2": 1100, "q3": 1300, "q4": 1500}
    }
  },
  
  "motivationAnalysis": {
    "burnoutRisk": "Low",
    "consistencyPatterns": ["Strong weekends", "Mid-week dip"],
    "peakProductivity": "7-11 PM",
    "recommendations": ["Schedule complex tasks in evenings", "Take Wednesday breaks"]
  },
  
  "interviewReadiness": {
    "technical": {
      "dsa": {"score": 65, "status": "Needs Work", "priority": "High"},
      "systemDesign": {"score": 40, "status": "Critical", "priority": "Very High"},
      "frontend": {"score": 85, "status": "Strong", "priority": "Low"}
    },
    "behavioral": {
      "communication": {"score": 70, "status": "Good", "priority": "Medium"},
      "leadership": {"score": 55, "status": "Developing", "priority": "Medium"}
    }
  },
  
  "resourcesRecommendations": {
    "courses": ["Full Stack Open", "AWS Cloud Practitioner"],
    "books": ["System Design Interview", "Clean Code"],
    "projects": ["E-commerce platform", "Social media app"],
    "practice": ["LeetCode medium", "Mock interviews"]
  },
  
  "learningPatterns": {
    "bestTime": "7-11 PM (82% retention rate)",
    "preferredMethod": "Hands-on projects (85% vs 45% theory)",
    "retentionRate": {"video": 45, "reading": 30, "handsOn": 85},
    "weeklyConsistency": 72
  },
  
  "onboardingData": ${JSON.stringify(onboardingData)}
}

IMPORTANT: Return ONLY valid JSON without any additional text or markdown. Base your analysis on the user's current skill levels, learning pace, and career aspirations. Make the predictions realistic and actionable.
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

        const careerPrediction = await prisma.aICareerPredictor.create({
            data: {
                userId: user.id,
                currentTimeline: parsedResponse.currentTimeline,
                optimizedTimeline: parsedResponse.optimizedTimeline,
                confidenceScore: parsedResponse.confidenceScore,
                jobReadyDate: new Date(parsedResponse.jobReadyDate),
                timelineComparison: parsedResponse.timelineComparison,
                daysSaved: parsedResponse.daysSaved,
                paceAnalysis: parsedResponse.paceAnalysis,
                skillsRadarData: parsedResponse.skillsRadarData,
                skillProgression: parsedResponse.skillProgression,
                riskAssessment: parsedResponse.riskAssessment,
                successProbability: parsedResponse.successProbability,
                careerPathScenarios: parsedResponse.careerPathScenarios,
                salaryProjections: parsedResponse.salaryProjections,
                companyTargets: parsedResponse.companyTargets,
                roleMatches: parsedResponse.roleMatches,
                skillGaps: parsedResponse.skillGaps,
                whatToDos: parsedResponse.whatToDos,
                whatNotToDos: parsedResponse.whatNotToDos,
                successFactors: parsedResponse.successFactors,
                actionPlan: parsedResponse.actionPlan,
                marketInsights: parsedResponse.marketInsights,
                motivationAnalysis: parsedResponse.motivationAnalysis,
                interviewReadiness: parsedResponse.interviewReadiness,
                resourcesRecommendations: parsedResponse.resourcesRecommendations,
                learningPatterns: parsedResponse.learningPatterns,
                onboardingData: parsedResponse.onboardingData,
                isOnboarded: true,
                predictionVersion: updatedNextVersion || 'v1.0'
            }
        });

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                credits: { decrement: 100 }
            }
        });

        await prisma.creditUsage.create({
            data: {
                userId: user.id,
                creditsUsed: 100,
                type : "CAREER_PREDICTOR",
                description: "Used 100 credits for generating career path prediction."
            }
        });

        await prisma.notification.create({
            data: {
                userId: user.id,
                title: "Career Predictor Generated",
                message: "Your career path prediction has been generated successfully using 100 credits.",
                type : "INFO",
            }
        });

        return NextResponse.json({
            message: "Your career path prediction has been generated successfully!",
        }, {
            status: 201
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Our servers are currently busy processing other requests. Please try again later." },
           { status: 500 });
    }
}