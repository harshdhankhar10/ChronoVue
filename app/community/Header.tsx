
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Users, Home, Compass, Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "@/utils/auth"

export default async function Header() {
    const session = await getServerSession(NEXT_AUTH);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className=" mx-auto flex h-16 items-center justify-between pr-6">
       <div className="flex items-center">
         <Link href="/" className="flex items-center gap-2 pl-6">
            <span className="text-2xl font-bold">
                Chrono<span className="text-primary font-bold">Vue</span>
            </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6 ml-6 md:ml-28">
          <Link href="/" className="text-gray-500 hover:text-primary ">
            <Home className="h-5 w-5" />
          </Link>
          <Link href="/community" className="text-gray-500 hover:text-primary ">
            <Users className="h-5 w-5" />
          </Link>
          <Link href="/community/discover" className="text-gray-500 hover:text-primary ">
            <Compass className="h-5 w-5" />
          </Link>

        </div>
       </div>

        <div className="hidden md:block flex-1 mx-6 max-w-md">
          <Input
            type="search"
            placeholder="Search communities, posts, users..."
            className="w-full pl-4 pr-4 py-2"
          />
        </div>
        {session?.user ? (
                   <div className="flex items-center space-x-8">
            <Link href="/community/create-space">
            <Button className="hidden md:flex items-center" >
                <Plus className="mr-2 h-4 w-4" /> Create Space
            </Button>
            </Link>
            <div className="flex items-center space-x-4">
                            <span className="relative cursor-pointer">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-primary rounded-full">3
                </span>
            </span>
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="User Menu"
            >
              <User className="h-5 w-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            </div>

       </div>
        ) : (
            <div className="flex space-x-4">
              <Link href="/signin"> <Button className="hidden md:block">Sign In</Button></Link>
                <Link href="/signup"> <Button variant="outline">Sign Up</Button></Link>
            </div>
        )}

      </div>
    </header>
  )
}
