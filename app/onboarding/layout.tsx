import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Onboarding - ChronoVue",
    description: "Get started with ChronoVue by completing the onboarding process.",
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