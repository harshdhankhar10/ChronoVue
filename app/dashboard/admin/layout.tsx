import React from 'react'
import { isAdmin } from '@/lib/isAdmin'
import { redirect } from 'next/navigation'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NotFound from '@/app/not-found';
import AdminSidebar from './AdminSidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin - Chronovue",
  description: "Admin dashboard for Chronovue",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>

) {
    const admin = await isAdmin()
    if (!admin) {
        return (
            <NotFound />
        )
    }


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}
        cz-shortcut-listen="true">
        <div className="flex">
          <AdminSidebar />
          <main className="ml-64 flex-1 pt-4 bg-gray-50 min-h-screen">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
