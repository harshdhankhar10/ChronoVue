import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChronoVue - AI Career Predictor & Timeline Platform",
  description: "ChronoVue uses AI to predict your job readiness timeline and create personalized career roadmaps. Get exact placement probabilities and skill gap analysis for tech careers.",
  keywords: [
    "career predictor",
    "placement readiness", 
    "job timeline",
    "AI career coach",
    "skill gap analysis",
    "college placement",
    "tech career roadmap",
    "learning analytics",
    "progress tracking",
    "interview preparation",
    "campus placement",
    "software developer career"
  ],
  authors: [{ name: "Harsh Dhankhar" }],
  openGraph: {
    title: "ChronoVue - AI Career Predictor",
    description: "Know exactly when you'll be job-ready. AI-powered career timeline predictor for college students and career switchers.",
    url: "https://www.chronovue.com",
    siteName: "ChronoVue",
    images: [
      {
        url: "https://www.chronovue.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ChronoVue - AI Career Timeline Predictor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChronoVue - AI Career Predictor",
    description: "Predict your job readiness timeline with AI. Get personalized career roadmaps and skill gap analysis.",
    images: ["https://www.chronovue.com/twitter-card.jpg"],
    creator: "@harshdhankhar10",
  },
  category: "Career Planning, Education Technology, AI Tools",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentLoggedInUserInfo();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}
        cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
