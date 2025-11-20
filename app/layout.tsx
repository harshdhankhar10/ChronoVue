import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import { GoogleAnalytics } from '@next/third-parties/google'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChronoVue | AI Job Readiness Predictor & Career Timeline Platform",
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
  openGraph: {
    title: "ChronoVue - AI Job Readiness Predictor | Know Your Placement Timeline",
    description: "Get exact AI predictions on when you'll be job-ready. Personalized career timelines, skill gap analysis, and placement readiness scores for Indian tech students.",
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
    title: "ChronoVue - AI Career Predictor",
    description: "Predict your job readiness timeline with AI. Get personalized career roadmaps and skill gap analysis.",
    images: ["https://www.chronovue.in/og_image.png"],
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
         <GoogleAnalytics gaId="G-RZQDFHC2Q7" />
      </body>
    </html>
  );
}
