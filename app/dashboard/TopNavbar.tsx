"use client"

import { Input } from '@/components/ui/input';
import { Bell, ChevronDown, Menu, MessageSquare, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

interface User {
    username: string;
    profilePicture: string;
    
}
    
interface UserProps {
    user: User;
    credits: undefined | number;
}

const TopNavbar = ({ user, credits }: UserProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-100 px-6 py-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 lg:hidden"
                        >
                            <Menu className="w-5 h-5 text-slate-700" />
                        </button>

                        <Link href="/dashboard" className="flex items-center space-x-3">
                            <Image
                                src="/final_logo.png"
                                alt="ChronoVue Logo"
                                width={254}
                                height={54}
                                className="lg:absolute md:absolute -left-2"
                                priority


                            />
                        </Link>
                    </div>

                    <div className="flex-1 w-full pl-48 mx-8 hidden sm:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Search anything..."
                                className="w-full pl-10 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors duration-200 relative">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className='bg-slate-100 text-slate-800 text-sm font-medium px-3 py-1.5 rounded-lg'>
                            
                            {credits} Credits
                        </div>

                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors duration-200"
                            >
                                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                    <Image alt="User Profile Picture" height={64} width={64} src={user.profilePicture} className='rounded-full' priority />
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-slate-800">
                                        @{user.username}
                                    </p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            </button>

                            {/* {isProfileOpen && (
                                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                        Profile
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                        Settings
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 border-t border-slate-100">
                                        Logout
                                    </button>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </header>

        </div>
    )
}

export default TopNavbar