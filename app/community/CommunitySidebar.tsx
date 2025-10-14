"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Compass, Users, Calendar, Plus, Sparkles, Target, Lock, SaveAll } from "lucide-react"

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Discover",
    href: "/community/discover",
    icon: Compass,
  },
  {
    name: "My Spaces",
    href: "/community/my-spaces",
    icon: Users,
  },
  {
    name: "Saved Posts",
    href: "/community/saved-posts",
    icon: SaveAll,
  },
  {
    name: "Timeline",
    href: "/community/timeline",
    icon: Calendar,
  },
  {
    name: "Join Private Space",
    href: "/community/private-join",
    icon: Lock,
  }
]



export default function CommunitySidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-60 min-h-screen hidden lg:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white",
                  pathname === item.href ? "bg-primary text-white" : "text-muted-foreground",
                )}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </div>

              </Link>
            ))}
          </div>
        </div>

     
     
      </div>
    </div>
  )
}
