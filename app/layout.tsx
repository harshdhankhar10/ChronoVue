import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChronoVue - Visualize Tomorrow, Today",
  description:
    "ChronoVue is an AI-powered platform that transforms your goals into interactive timelines with milestones, risk analysis, and scenario simulations. Plan smarter, track progress, and visualize your future with powerful analytics.",
  keywords: [
    "AI timeline",
    "future planning",
    "goal visualization",
    "AI productivity tool",
    "timeline generator",
    "scenario simulation",
    "risk analysis tool",
    "progress tracker",
    "goal setting platform",
  ],
  authors: [{ name: "ChronoVue Team" }],
  openGraph: {
    title: "ChronoVue - Visualize Tomorrow, Today",
    description:
      "Turn your goals into interactive timelines with AI-driven milestones, risk insights, and future scenarios. Start visualizing your tomorrow, today.",
    url: "https://www.chronovue.com",
    siteName: "ChronoVue",
    images: [
      {
        url: "https://www.chronovue.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ChronoVue - AI-Powered Future Timeline Visualization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChronoVue - Visualize Tomorrow, Today",
    description:
      "AI-powered platform to transform your goals into interactive timelines. Plan milestones, simulate scenarios, and track progress like never before.",
    images: ["https://www.chronovue.com/twitter-card.jpg"],
    creator: "@chronovue",
  },
  category: "Productivity, AI Tools, Future Planning",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}
        cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
