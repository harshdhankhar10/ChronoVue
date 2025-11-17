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
    MessageSquare,
    X,
    Menu,
    Target,
    Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AIChatbotModal from '@/components/Dashboard/AI Assistant/AssistantHomepage';
import Image from 'next/image';

interface SidebarProps {
    isOpenProp?: boolean;
}

const Sidebar = ({ isOpenProp }: SidebarProps) => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    const navigationItems = [
        { isNew : false, id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', link: '/dashboard/user' },
        { isNew : false, id: 'timelines', icon: GitBranch, label: 'My Timelines', link: '/dashboard/user/timelines' },
        { isNew : false, id: 'create', icon: PlusSquare, label: 'Create Timeline', link: '/dashboard/user/timelines/create' },
        { isNew : false, id: 'ai-insights', icon: Brain, label: 'AI Insights', link: '/dashboard/user/ai-insights' },
        { isNew : true, id: 'Career Predictor', icon: Target, label: 'Career Predictor', link: '/dashboard/user/career-predictor' },
        { isNew : true, id: 'Market Skills Analysis', icon: Lightbulb, label: 'Market Skills Analysis', link: '/dashboard/user/market-skills-analysis' },
        { isNew : false, id: 'journal', icon: BookOpen, label: 'Journal', link: '/dashboard/user/journal' },
        { isNew : false, id: 'mentor', icon: Users, label: 'Mentor Connect', link: '/dashboard/user/mentor' },
        { isNew : false, id: 'community', icon: Users, label: 'Community', link: '/dashboard/user/community/' },
        { isNew : false, id: 'resources', icon: Bookmark, label: 'Resources', link: '/dashboard/user/resources' }
    ];

    const NavItem = ({ item, isActive, isNew }: { item: any; isActive: boolean; isNew: boolean }) => {
        const Icon = item.icon;

        return (
            <Link href={item.link}>
                <div
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                        isActive
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                    }
                    `}
                >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {isNew && (
                        <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                            New
                        </span>
                    )}
                </div>
            </Link>
        );
    };

    return (
        <>
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
                <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed left-0 top-0 bottom-0 shadow-sm">
                <div className="flex flex-col h-full mt-16">
                    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                        <h3 className="px-3 text-xs font-semibold text-gray-400 mb-3">
                            NAVIGATION
                        </h3>
                        {navigationItems.map((item) => (
                            <div key={item.id} onClick={() => setActiveItem(item.id)}>
                                <NavItem
                                    item={item}
                                    isActive={activeItem === item.id}
                                    isNew={item.isNew}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-100">
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 shadow-sm">
                            <Button 
                                onClick={() => setIsAiModalOpen(!isAiModalOpen)}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm shadow-sm hover:shadow transition-all"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                {isAiModalOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>

            {isAiModalOpen && (
                <AIChatbotModal 
                    isOpen={isAiModalOpen} 
                    onClose={() => setIsAiModalOpen(false)} 
                />
            )}

            {isSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    
                    <div className="absolute top-0 left-0 bottom-0 w-80 bg-white border-r border-gray-100 shadow-xl transform transition-transform">
                        <div className="flex items-center justify-between h-16 border-b border-gray-100 px-6">
                              <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/final_logo.png" alt="ChronoVue Logo"
                                width={50}
                                height={40}
                            />
                            <span className="font-bold text-2xl">Chrono<span className="text-primary">Vue</span></span>
                        </Link>
                    </div>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-4 space-y-1">
                            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Navigation
                            </h3>
                            {navigationItems.map((item) => (
                                <div key={item.id} onClick={() => {
                                    setActiveItem(item.id);
                                    setIsSidebarOpen(false);
                                }}>
                                    <NavItem
                                        item={item}
                                        isActive={activeItem === item.id}
                                        isNew={item.isNew}
                                    />
                                </div>
                            ))}
                          
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;