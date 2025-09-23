"use client"

import React, { useState } from 'react';
import {
    LayoutDashboard,
    GitBranch,
    PlusSquare,
    Brain,
    BookOpen,
    Users,
    Bookmark,
    Bell,
    MessageSquare,
    Settings,
    LogOut,
    X,
    Menu,
    Search,
    ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
    isActive: boolean;
    onClick: () => void;
    item: {
        icon: React.ElementType;
        label: string;
    };

}

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigationItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', link: '/dashboard' },
        { id: 'timelines', icon: GitBranch, label: 'My Timelines', link: '/dashboard/timelines' },
        { id: 'create', icon: PlusSquare, label: 'Create Timeline', link: '/dashboard/timelines/create' },
        { id: 'ai-insights', icon: Brain, label: 'AI Insights', link: '/dashboard/ai-insights' },
        { id: 'journal', icon: BookOpen, label: 'Journal / Reflections', link: '/dashboard/journal' },
        { id: 'mentor', icon: Users, label: 'Mentor Connect', link: '/dashboard/mentor' },
        { id: 'community', icon: Users, label: 'Community', link: '/dashboard/community' },
        { id: 'resources', icon: Bookmark, label: 'Resources', link: '/dashboard/resources' }
    ];

    const NavItem = ({ item, isActive, onClick }: SidebarProps) => {
        const Icon = item.icon;
        return (
            <button
                onClick={onClick}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
            >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
            </button>
        );
    };

    return (
        <>

            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed left-0 top-16 bottom-0">
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Main Menu
                        </h3>
                        {navigationItems.map((item) => (
                            <Link key={item.id} href={item.link}>
                                <NavItem
                                    key={item.id}
                                    item={item}
                                    isActive={activeItem === item.id}
                                    onClick={() => setActiveItem(item.id)}
                                />
                            </Link>
                        ))}
                    </div>

                    <div className="px-5 py-4 border-t border-slate-100 bg-white">
                        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            Account
                        </h3>
                        <Link href="/dashboard/settings">
                            <NavItem
                                item={{ icon: Settings, label: 'Settings' }}
                                isActive={activeItem === 'settings'}
                                onClick={() => setActiveItem('settings')}
                            />
                        </Link>
                        <Link href="/dashboard/logout">
                            <NavItem
                                item={{ icon: LogOut, label: 'Logout' }}
                                isActive={activeItem === 'logout'}
                                onClick={() => setActiveItem('logout')}
                            />
                        </Link>
                    </div>
                </div>
            </aside>

            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div
                        className="absolute top-0 left-0 bottom-0 w-80 bg-white border-r border-slate-100 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between h-16 border-b border-slate-100 px-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <LayoutDashboard className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-lg text-slate-800">ChronoVue</span>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 rounded-lg hover:bg-slate-100"
                            >
                                <X className="w-5 h-5 text-slate-700" />
                            </button>
                        </div>

                        <div className="p-5 space-y-1">
                            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                Main Menu
                            </h3>
                            {navigationItems.map((item) => (
                                <Link key={item.id} href={item.link}>
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveItem(item.id);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${activeItem === item.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                </Link>
                            ))}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-slate-100 bg-white">
                            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                Account
                            </h3>
                            <button
                                onClick={() => {
                                    setActiveItem('notifications');
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${activeItem === 'notifications'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <Bell className="w-5 h-5" />
                                <span className="font-medium">Notifications</span>
                            </button>
                            <button
                                onClick={() => {
                                    setActiveItem('settings');
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${activeItem === 'settings'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <Settings className="w-5 h-5" />
                                <span className="font-medium">Settings</span>
                            </button>
                            <button
                                onClick={() => {
                                    setActiveItem('logout');
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${activeItem === 'logout'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default Sidebar;