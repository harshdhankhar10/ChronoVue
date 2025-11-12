import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";



export const metadata: Metadata = {
  title: "Verify Email to Access Account - ChronoVue",
  description: "Verify your email address to access your ChronoVue account and unlock personalized AI career predictions.",
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
  openGraph: {
    title: "Verify Email to Access Account - ChronoVue",
    description: "Verify your email address to access your ChronoVue account and unlock personalized AI career predictions.",
    url: "https://www.chronovue.in",
    siteName: "ChronoVue",
    images: [
      {
        url: "https://www.chronovue.in/og_image.png",
        width: 1200,
        height: 630,
        alt: "ChronoVue AI Career Predictor - Your Personalized Job Readiness Timeline",
      },
    ],
    locale: "en_US",
    type: "website",
    emails: ["support@chronovue.in"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Email to Access Account - ChronoVue",
    description: "Verify your email address to access your ChronoVue account and unlock personalized AI career predictions.",
    images: ["https://www.chronovue.in/og_image.png"],
    creator: "@harshdhankhar10",
  },
  category: "Career Planning, Education Technology, AI Tools",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function VerifyEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div>
    {children}
  </div>
  );
}
