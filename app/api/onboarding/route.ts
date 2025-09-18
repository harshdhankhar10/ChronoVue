import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = session.user;

    try {
        const {
            primaryGoalCategory, topGoals, timeHorizon, riskTolerance,
            preferredView, interests, referralSource, profile, referralId
        } = await req.json();

        const onboarding = await prisma.onboarding.upsert({
            where: { userId: user.id },
            update: {
                primaryGoalCategory,
                topGoals,
                timeHorizon,
                riskTolerance,
                preferredView,
                interests,
                onboardingStep: 7,
                referralSource,
                referralID: referralSource === 'Having Referral ID' ? referralId : null,
                completedAt: new Date(),
            },
            create: {
                userId: user.id,
                primaryGoalCategory,
                topGoals,
                timeHorizon,
                riskTolerance,
                preferredView,
                interests,
                onboardingStep: 7,
                referralSource,
                referralID: referralSource === 'Having Referral ID' ? referralId : null,
                completedAt: new Date(),
            }
        });

        const profileUpdate = await prisma.profile.upsert({
            where: { userId: user.id },
            update: {
                bio: profile.bio,
                location: profile.location,
                careerStage: profile.careerStage,
                headline: profile.headline,
                skills: profile.skills,
                timezone: profile.timezone,
            },
            create: {
                userId: user.id,
                bio: profile.bio,
                location: profile.location,
                careerStage: profile.careerStage,
                headline: profile.headline,
                skills: profile.skills,
                timezone: profile.timezone,
            }
        });

        return NextResponse.json({ message: "Onboarding completed successfully", onboarding }, { status: 201 });

    } catch (error) {
        console.error("Error during onboarding:", error);
        return NextResponse.json({ error: "Onboarding failed" }, { status: 500 });
    }
}
