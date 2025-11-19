import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";



export const metadata: Metadata = {
  title: "Career Transformation Use Cases - ChronoVue",
  description: "Discover how ChronoVue users achieved career goals. From learning paths to job transitions - see real timelines and results that inspire action.",
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
    title: "Career Transformation Use Cases - ChronoVue",
    description: "Discover how ChronoVue users achieved career goals. From learning paths to job transitions - see real timelines and results that inspire action.",
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
    title: "Career Transformation Use Cases - ChronoVue",
    description: "Discover how ChronoVue users achieved career goals. From learning paths to job transitions - see real timelines and results that inspire action.",
    images: ["https://www.chronovue.in/og_image.png"],
    creator: "@harshdhankhar10",
  },
  category: "Career Planning, Education Technology, AI Tools",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ContactLayout({
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
