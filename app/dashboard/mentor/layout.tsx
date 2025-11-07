import React from 'react'
import type { Metadata } from "next";
import NotFound from '@/app/not-found';
import MentorSidebar from './MentorSidebar';
import { isMentor } from '@/lib/isMentor';

export const metadata: Metadata = {
  title: "Your Mentor Dashboard - Chronovue",
  description: "Manage your mentoring activities and connect with mentees on Chronovue.",
};

export default async function MentorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>

) {
    const mentor = await isMentor()
    if (!mentor) {
        return (
            <NotFound />
        )
    }


  return (
        <div className="flex">
          <MentorSidebar />
          <main className="ml-64 flex-1 pt-4 bg-gray-50 min-h-screen">
            {children}
          </main>

        </div>
  );
}
