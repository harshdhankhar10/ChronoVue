"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

const Navbar = () => {

    useEffect(() => {
        let fetchSession = async () => {
            const session = await getSession();
            if (session) setSession(session)
        }

        fetchSession()
    }, [])

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const [session, setSession] = useState<Session | null>(null);
    let user = session?.user;


    return (
        <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 ">
            <div className="container mx-auto px-4 lg:px-6 max-w-8xl">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2 relative -left-6">
                        <Link href="/">
                            <img src="/final_logo.png" alt="ChronoVue Logo"
                                className="h-64"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="nav-link">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="nav-link">
                            How It Works
                        </Link>
                        <Link href="#pricing" className="nav-link">
                            Pricing
                        </Link>
                        <Link href="#about" className="nav-link">
                            Solutions
                        </Link>

                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {!session && (
                            <Button variant="outline" onClick={() => router.push('/signin')} >
                                Sign In
                            </Button>
                        )}
                        <Button onClick={session ? (() => router.push('/dashboard')) : (() => router.push('/signup'))} >
                            {session ? <span>My Dashboard</span> : <span>Start Free Trial</span>}
                        </Button>
                        {session && (
                            <Button variant="outline" onClick={() => signOut()} >
                                Logout
                            </Button>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden  py-4 border-t border-border">
                        <div className="flex flex-col justify-center items-center space-y-4 px-8">
                            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
                                Features
                            </Link>
                            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-smooth">
                                How It Works
                            </Link>
                            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-smooth">
                                Pricing
                            </Link>
                            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-smooth">
                                About
                            </Link>
                            <div className="flex flex-col space-y-2 pt-4">
                                {!session && (
                                    <Button variant="outline" onClick={() => router.push('/signin')} >
                                        Sign In
                                    </Button>
                                )}
                                <Button onClick={session ? (() => router.push('/dashboard')) : (() => router.push('/signup'))} >
                                    {session ? <span>My Dashboard</span> : <span>Start Free Trial</span>}
                                </Button>
                                {session && (
                                    <Button variant="outline" onClick={() => signOut()} >
                                        Logout
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;