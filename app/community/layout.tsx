import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Header from "./Header";
import CommunitySidebar from "./CommunitySidebar";

export const metadata: Metadata = {
  title: "ChronoVue Community - Connect, Share & Grow Together",
  description:
    "Join the ChronoVue Community to connect with like-minded individuals, share your experiences, and grow together. Our platform offers a supportive environment where you can exchange ideas, seek advice, and collaborate on projects. Whether you're a beginner or an expert, the ChronoVue Community is the perfect place to enhance your skills and expand your network. Engage in discussions, participate in events, and access exclusive resources designed to help you succeed. Become a part of our vibrant community today and take your journey to the next level with ChronoVue.",
};

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(NEXT_AUTH);

  return (
    <>
       <div className="min-h-screen bg-background">
          <Header />
          <div className="flex">
            <aside className="hidden md:block fixed top-16 left-0 w-60 border-r bg-background">
              <CommunitySidebar />
            </aside>
            <main className="flex-1 p-4 md:pl-64">{children}</main>
          </div>
        </div>
    </>
  );
}
