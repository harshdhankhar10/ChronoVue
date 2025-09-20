import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Dashboard | ChronoVue",
    description: "Your personal dashboard to manage and track your activities.",
};

export default async function DashboardLayout({
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

    if (onboardingDetails?.onboardingStep !== 7) {
        return <>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Complete Your Onboarding</h1>
                    <p className="mb-6">Please complete the onboarding process to access your dashboard.</p>
                    <Link href="/onboarding">
                        <Button >Go to Onboarding</Button>
                    </Link>
                </div>
            </div>
        </>
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50">
                <div className="flex flex-col lg:flex-row">
                    <Sidebar />

                    <div className="flex-1 lg:ml-0">
                        <TopNavbar user={session.user} />
                        <main className="pt-20 md:pl-64 mx-2 mb-8 sm:pl-4">
                            {children}
                        </main>
                    </div>
                </div>
            </div>


        </>
    );
}