import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Onboarding - ChronoVue",
  description: "ChronoVue's AI predicts exactly when you'll be job-ready. Get personalized placement timelines, skill gap analysis, and career roadmaps for tech roles. 85% prediction accuracy.",
  keywords: [
    "AI career predictor",
    "job readiness timeline",
    "placement readiness",
    "career timeline prediction",
    "skill gap analysis AI",
    "career roadmap generator",
    "learning progress tracker",
    "placement probability calculator",
    "college placement preparation",
    "campus placement predictor",
    "tech career planning",
    "software developer career path",
    "when will I get a job",
    "job ready timeline",
    "career switch timeline",
    "placement preparation time",
    "India placement predictor",
    "Indian tech careers",
    "Bangalore job readiness",
    "Indian college placements"
  ],
  authors: [{ name: "ChronoVue Team" }],
  creator: "ChronoVue",
  publisher: "ChronoVue",
};


export default async function OnboardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return redirect("/signin");
    }
    if (session.user?.role !== "USER") {
        return redirect("/signin");
    }

    let user = await prisma?.user.findUnique({
        where: { id: session.user.id },
    });

    if (!user) {
        return redirect("/signin");
    }


    const onboardingDetails = await prisma?.onboarding.findUnique({
        where: { userId: session.user.id },
    });

    if (onboardingDetails?.onboardingStep === 7) {
        return redirect("/dashboard");
    }


    return (
        <>
            <div className="min-h-screen bg-slate-50">
                {children}
            </div>

        </>
    );
}