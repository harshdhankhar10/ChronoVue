"use client"

import React, { useState } from 'react';
import { ArrowRight, Menu, X, Zap, Target, ShieldAlert, Sparkles, CheckCircle, Bot, GitCommit } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, children, iconBgColor }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 font-rajdhani">{title}</h3>
        <p className="mt-2 text-slate-600 text-sm">{children}</p>
    </div>
);

const HowItWorksStep = ({ number, title, children }: any) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold font-rajdhani text-lg">
            {number}
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-900 font-rajdhani">{title}</h3>
            <p className="mt-1 text-slate-600 text-sm">{children}</p>
        </div>
    </div>
);

export default function Homepage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const FontStyles = () => (
        <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Rajdhani:wght@600;700&display=swap');
            .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
            body { font-family: 'Poppins', sans-serif; }
            .animate-float { animation: float 6s ease-in-out infinite; }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
            }
        `}</style>
    );

    return (
        <>
            <div className="flex justify-center flex-col items-center min-h-screen  w-full max-w-7xl mx-auto ">
                <div className=" ">
                    <FontStyles />
                    <main className="text-center px-6 pt-32 pb-16">
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 max-w-4xl leading-tight font-rajdhani mx-auto">
                            Cut Future Planning Time & Risks in Half. <span className="text-orange-500">Instantly.</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                            Supercharge your goals with the most advanced AI timeline generation. Plan smarter, anticipate risks, and achieve your objectives faster.
                        </p>
                        <a href="#" className="mt-8 text-lg font-semibold bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20 mx-auto w-fit">
                            <span>Get a free trial</span><ArrowRight className="w-5 h-5" />
                        </a>
                        <div className="mt-12 text-sm font-semibold text-slate-700 flex items-center justify-center gap-4">
                            <span>14-day free trial</span><span className="text-slate-300">|</span><span>No credit card needed</span>
                        </div>
                    </main>

                    <div className="w-full px-6">
                        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-4">
                            <div className="bg-slate-100 p-6 rounded-xl relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div><div className="w-3 h-3 bg-yellow-400 rounded-full"></div><div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="bg-white rounded-lg p-6">
                                    <div className="h-6 w-1/3 bg-slate-200 rounded-md animate-pulse"></div>
                                    <div className="mt-4 h-4 w-2/3 bg-slate-200 rounded-md animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="py-24 bg-white mt-16">
                        <div className="container mx-auto px-6 text-center">
                            <div className="text-center lg:text-left">
                                <h2 className="text-4xl md:text-5xl text-center font-bold text-slate-900 font-rajdhani">From Goal to Reality in 3 Simple Steps</h2>
                                <p className="mt-4 text-lg text-center text-slate-600 ">Our intuitive process, powered by AI, makes complex planning effortless and effective.</p>
                                <div className="mt-12 space-y-10">
                                    <HowItWorksStep number="1" title="Define Your Vision">Start by telling ChronoVue your primary objective. Whether it's a career change or a personal project, clarity is the first step.</HowItWorksStep>
                                    <HowItWorksStep number="2" title="AI Generates Your Plan">Our intelligent engine instantly builds a comprehensive timeline, complete with suggested milestones, potential risks, and resource recommendations.</HowItWorksStep>
                                    <HowItWorksStep number="3" title="Track, Adapt, and Achieve">Visualize your progress, get smart suggestions to stay on track, and adapt your plan as you go. Your future is dynamic, and so is your timeline.</HowItWorksStep>
                                </div>
                            </div>

                        </div>
                    </section>
                    <section className="py-24">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-rajdhani">A Platform Built for Clarity and Action</h2>
                            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <FeatureCard icon={Zap} title="AI Timeline Generation" iconBgColor="bg-blue-600">Instantly create dynamic roadmaps from a single goal.</FeatureCard>
                                <FeatureCard icon={Target} title="Milestone Tracking" iconBgColor="bg-green-600">Break down large goals into manageable steps.</FeatureCard>
                                <FeatureCard icon={ShieldAlert} title="Risk Analysis" iconBgColor="bg-red-600">Identify potential obstacles before they happen.</FeatureCard>
                                <FeatureCard icon={Bot} title="Smart Suggestions" iconBgColor="bg-purple-600">Receive personalized recommendations for resources.</FeatureCard>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 bg-white">
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-rajdhani">Ready to Visualize Your Success?</h2>
                            <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">Start your 14-day free trial today. No credit card required.</p>
                            <a href="#" className="mt-8 inline-flex items-center gap-2 text-lg font-semibold bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                                <span>Start Your Free Trial</span><ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}

