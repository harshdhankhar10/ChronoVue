"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/admin/users?page=1", icon: Users },
  { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { name: "Mentor Applications", href: "/dashboard/admin/mentor-applications", icon: Users },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  { name: "Support", href: "/dashboard/admin/support", icon: LifeBuoy },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-primary text-white flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="p-6 text-2xl font-bold">Admin Dashboard</div>
        <nav className="flex flex-col">
          {links.map(({ name, href, icon: Icon }) => {
            let active = pathname === href;
            if (name === "Users" && pathname.startsWith("/dashboard/admin/users")) {
              active = true;
            }
            if (name === "Mentor Applications" && pathname.startsWith("/dashboard/admin/mentor-applications")) {
              active = true;
            }
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
        <Button variant={"outline"} className="w-full hover:text-white hover:border-white">
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </aside>
  );
}
