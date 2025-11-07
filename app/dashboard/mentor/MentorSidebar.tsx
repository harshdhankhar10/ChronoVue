"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";


const links = [
  { name: "Dashboard", href: "/dashboard/mentor", icon: LayoutDashboard },
  { name: "Calendar", href: "/dashboard/mentor/calendar", icon: BarChart3 },
  { name: "Sessions", href: "/dashboard/mentor/sessions", icon: LifeBuoy },
  { name: "Students", href: "/dashboard/mentor/students", icon: Users },
  { name: "Availability", href: "/dashboard/mentor/availability", icon: BarChart3 },
  { name: "Earnings", href: "/dashboard/mentor/earnings", icon: BarChart3 },
  { name: "Resources", href: "/dashboard/mentor/resources", icon: BarChart3 },
  { name: "Profile", href: "/dashboard/mentor/profile", icon: Settings },
  { name: "Reviews", href: "/dashboard/mentor/reviews", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/mentor/settings", icon: Settings },
  { name: "Help", href: "/dashboard/mentor/help", icon: LifeBuoy },

];

export default function MentorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-primary text-white flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="p-4 text-2xl font-bold">Mentor Dashboard</div>
        <nav className="flex flex-col">
          {links.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  active ? "bg-white text-primary font-semibold" : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                {name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6">
        <Button onClick={() =>signOut()} variant={"outline"} className="w-full hover:text-white hover:border-white">
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </aside>
  );
}
