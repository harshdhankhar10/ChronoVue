"use client"

import React, { useState } from 'react';
import {
    Search,
    User,
    Settings,
    LogOut,
    Bell,
    MessageSquare,
    ChevronDown,
    X,
    CreditCard,
    Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';


interface UserInfo {
    id: string;
    fullName: string | null;
    email: string;
    profilePicture: string;
    credits: number;
}

interface Notification {
    id: string;
    title : string;
    message : string;
    isRead : boolean;
    createdAt : Date;
  }

  interface TopNavbarProps {
    userInfo : UserInfo;
    notifications : Notification[];
  }


const TopNavbar = ({userInfo, notifications}: TopNavbarProps) => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router  = useRouter();
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleUpdateReadStatus = async()=>{
        try {
            setIsNotificationsOpen(!isNotificationsOpen)
            
            if(unreadCount > 0){
                await axios.patch("/api/dashboard/update-notification-status");
            }
        } catch (error) {
            console.log(error)
        }
    }



    const formatTimestamp = (timestamp: Date) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 shadow-sm">
                <div className="h-full px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/final_logo.png" alt="ChronoVue Logo"
                                width={50}
                                height={40}
                            />
                            <span className="font-bold text-2xl">Chrono<span className="text-primary">Vue</span></span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className='hidden md:block'>
                            <Link href="/dashboard/user/settings/credits">
                            <Button variant={"outline"}>
                                <span>Credits Left: {userInfo.credits}</span>
                                    
                            </Button>
                            </Link>
                        </div>
                        <div className="relative">
                            <Button
                                variant={"outline"}
                                onClick={() =>handleUpdateReadStatus()}
                            >
                                <Bell className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white font-medium">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>
                        </div>

                        <div className="relative">
                            <Button 
                                variant={"outline"}
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                                    <Image
                                        src={userInfo.profilePicture || '/default-profile.png'}
                                        alt="Profile Picture"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-sm font-medium text-gray-900">{userInfo.fullName}</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </Button>

                            {isProfileOpen && (
                                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-40">
                                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                                        <p className="text-sm font-semibold text-gray-900">{userInfo.fullName}</p>
                                        <p className="text-sm text-gray-500">{userInfo.email}</p>
                                        <div className="mt-1">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                Credits left: {userInfo.credits}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <Link href="/dashboard/user/profile" className=" flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-lg mx-2">
                                            <User className="w-4 h-4" />
                                            <span>Profile Settings</span>
                                        </Link>
                                        <Link href="/dashboard/user/settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-lg mx-2">
                                            <Settings className="w-4 h-4" />
                                            <span>Account Preferences</span>
                                        </Link>
                                        <Link href="/dashboard/user/settings/transactions-history" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-lg mx-2">
                                            <CreditCard className="w-4 h-4" />
                                            <span>Transactions History</span>
                                        </Link>
                                        <Link href="/dashboard/user/settings/credits-usage" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-lg mx-2">
                                            <Coins className="w-4 h-4" />
                                            <span>Credits Usage History</span>
                                        </Link>
                                    </div>
                                    <div className="border-t border-gray-100 pt-2 mx-4">
                                        <Button variant={"destructive"} className='w-full' >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>


            {isNotificationsOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-end pt-16">
                    <div
                        className="absolute inset-0 bg-black/40 "
                        onClick={() => setIsNotificationsOpen(false)}
                    />
                    <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-96 max-h-[80vh] overflow-hidden mr-4 mt-2">
                        <div className="flex items-center justify-between p-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                                <p className="text-sm text-gray-500">{unreadCount} unread messages</p>
                            </div>
                            <div className="flex items-center gap-2">

                                <button
                                    onClick={() => {setIsNotificationsOpen(false); router.refresh();}}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-96">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-sm">No notifications</p>
                                    <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                                </div>
                            ) : (
                                <div className="p-2">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 rounded-lg border mb-2  ${notification.isRead
                                                    ? 'bg-white border-gray-200'
                                                    : 'bg-orange-50 border-primary'
                                                }`}
                                        >
                                           
                                            <h4 className="font-semibold text-gray-900 text-sm flex justify-between items-center text-center">
                                                {notification.title}
                                                <span className="text-xs text-gray-500">
                                                {formatTimestamp(notification.createdAt)}
                                            </span>
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {notification.message}. 
                                               
                                            </p>
                                          
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopNavbar;