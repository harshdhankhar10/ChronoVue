"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Briefcase, GraduationCap, HeartPulse, Landmark, Smile, Rocket, Calendar, LayoutDashboard, ArrowRight, ArrowLeft, Shield, Activity, TrendingUp, GitCommit, Loader } from 'lucide-react';
import Swal from 'sweetalert2';
import timezones from 'timezones-list';
import { useRouter } from 'next/navigation';


const goalCategories = [
    { id: 'CAREER', label: 'Career', icon: Briefcase },
    { id: 'EDUCATION', label: 'Education', icon: GraduationCap },
    { id: 'HEALTH', label: 'Health & Fitness', icon: HeartPulse },
    { id: 'FINANCE', label: 'Finance', icon: Landmark },
    { id: 'PERSONAL_GROWTH', label: 'Personal Growth', icon: Smile },
    { id: 'ENTREPRENEURSHIP', label: 'Entrepreneurship', icon: Rocket },
];

const timeHorizons = [
    { id: 'ONE_YEAR', label: '1 Year' },
    { id: 'THREE_YEARS', label: '3 Years' },
    { id: 'FIVE_YEARS', label: '5+ Years' },
];

const riskTolerances = [
    { id: 'LOW', label: 'Cautious', icon: Shield },
    { id: 'MEDIUM', label: 'Balanced', icon: Activity },
    { id: 'HIGH', label: 'Aggressive', icon: TrendingUp },
];

const preferredViews = [
    { id: 'TIMELINE', label: 'Timeline', icon: Calendar },
    { id: 'ROADMAP', label: 'Roadmap', icon: GitCommit },
    { id: 'CALENDAR', label: 'Dashboard', icon: LayoutDashboard },
];

const referralSources = ['Friend or Colleague', 'LinkedIn', 'Advertisement', 'Social Media', 'Having Referral ID', 'Other'];
const careerStages = ['Student', 'Entry-Level', 'Mid-Career', 'Senior-Level', 'Executive', 'Founder / Entrepreneur'];

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [primaryGoalCategory, setPrimaryGoalCategory] = useState('');
    const [topGoals, setTopGoals] = useState(['', '', '']);
    const [timeHorizon, setTimeHorizon] = useState('');
    const [riskTolerance, setRiskTolerance] = useState('');
    const [preferredView, setPreferredView] = useState('');
    const [interests, setInterests] = useState([]);
    const [referralSource, setReferralSource] = useState('');
    const [referralId, setReferralId] = useState('');
    const [headline, setHeadline] = useState('');
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [careerStage, setCareerStage] = useState('');
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState('');
    const [currentInterest, setCurrentInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const totalSteps = 7;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

    const handleTopGoalChange = (index: number, value: string) => {
        const newGoals = [...topGoals];
        newGoals[index] = value;
        setTopGoals(newGoals);
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const removeInterest = (interestToRemove: string) => {
        setInterests(interests.filter(interest => interest !== interestToRemove));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/onboarding', {
                primaryGoalCategory,
                topGoals: topGoals.filter(goal => goal.trim() !== ''),
                timeHorizon,
                riskTolerance,
                preferredView,
                interests,
                referralSource,
                referralId,
                profile: {
                    headline,
                    bio,
                    location,
                    careerStage,
                    skills,
                    timezone: timeZone,
                }
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Onboarding Complete!',
                    text: 'Your onboarding is complete. Redirecting to your dashboard...',
                    timer: 3000,
                    timerProgressBar: true,
                    didClose: () => {
                        router.push('/dashboard');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: response.data.error || 'There was an issue submitting your data. Please try again.',
                });
            }

        } catch (error: any) {
            console.error('Error submitting data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.response?.data?.error || 'There was an issue submitting your data. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddTopGoal = () => {
        setTopGoals(prev => [...prev, '']);
    };

    const handleAddSkill = () => {
        if (currentSkill.trim()) {
            setSkills((prev): any => [...prev, currentSkill.trim()]);
            setCurrentSkill('');
        }
    }

    const handleAddInterest = () => {
        if (currentInterest.trim()) {
            setInterests((prev): any => [...prev, currentInterest.trim()]);
            setCurrentInterest('');
        }
    }

    const renderStepContent = () => {
        switch (step) {
            case 0: return (
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Welcome to ChronoVue!</h2>
                    <p className="mt-2 text-slate-600">Let's personalize your experience. First, what's your primary focus?</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                        {goalCategories.map(({ id, label, icon: Icon }) => (
                            <button key={id} onClick={() => setPrimaryGoalCategory(id)} className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg ${primaryGoalCategory === id ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                                <Icon className={`w-8 h-8 mb-2 ${primaryGoalCategory === id ? 'text-blue-600' : 'text-slate-500'}`} />
                                <span className={`font-semibold text-sm ${primaryGoalCategory === id ? 'text-blue-700' : 'text-slate-700'}`}>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
            case 1: return (
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold text-slate-900">What Are Your Top Goals?</h2>
                    <p className="mt-2 text-slate-600">List up to three key objectives you want to achieve in this category.</p>
                    <div className="max-w-lg mx-auto space-y-4 mt-8">
                        {topGoals.map((goal, i) => (
                            <input
                                key={i}
                                type="text"
                                value={goal}
                                onChange={e => handleTopGoalChange(i, e.target.value)}
                                placeholder={`Top Goal ${i + 1}`}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                            />
                        ))}

                        <button onClick={handleAddTopGoal} className="mt-2 text-blue-600 hover:underline text-sm">+ Add Another Goal</button>


                    </div>
                </div>
            );
            case 2: return (
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Define Your Planning Style</h2>
                    <p className="mt-2 text-slate-600">This helps our AI understand your approach to achieving goals.</p>
                    <div className="max-w-2xl mx-auto space-y-8 mt-8">
                        <div>
                            <h3 className="font-semibold text-slate-800">Time Horizon</h3>
                            <div className="flex justify-center space-x-4 mt-3">
                                {timeHorizons.map(({ id, label }) => (
                                    <button key={id} onClick={() => setTimeHorizon(id)} className={`px-8 py-4 border-2 rounded-lg font-semibold text-sm ${timeHorizon === id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800">Risk Tolerance</h3>
                            <div className="grid grid-cols-3 gap-4 mt-3">
                                {riskTolerances.map(({ id, label, icon: Icon }) => (
                                    <button key={id} onClick={() => setRiskTolerance(id)} className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg ${riskTolerance === id ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                                        <Icon className={`w-7 h-7 mb-2 ${riskTolerance === id ? 'text-blue-600' : 'text-slate-500'}`} />
                                        <span className={`font-semibold text-sm ${riskTolerance === id ? 'text-blue-700' : 'text-slate-700'}`}>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 3: return (
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold text-slate-900">What's Your Preferred View?</h2>
                    <p className="mt-2 text-slate-600">Choose how you'd like to visualize your goals.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto mt-8">
                        {preferredViews.map(({ id, label, icon: Icon }) => (
                            <button key={id} onClick={() => setPreferredView(id)} className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg ${preferredView === id ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                                <Icon className={`w-8 h-8 mb-2 ${preferredView === id ? 'text-blue-600' : 'text-slate-500'}`} />
                                <span className={`font-semibold text-sm ${preferredView === id ? 'text-blue-700' : 'text-slate-700'}`}>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
            case 4: return (
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Skills & Interests</h2>
                    <p className="mt-2 text-slate-600">Add any relevant skills or interests to help us refine your experience.</p>
                    <div className="space-y-4 max-w-lg mx-auto mt-8">
                        <div className="flex flex-col gap-2">
                            <div>
                                <input type="text" value={currentSkill} onChange={e => setCurrentSkill(e.target.value)} placeholder="Add Skill" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                                <button onClick={handleAddSkill} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add</button>
                            </div>
                            <div>
                                <input type="text" value={currentInterest} onChange={e => setCurrentInterest(e.target.value)} placeholder="Add Interest" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                                <button onClick={handleAddInterest} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add</button>
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <h4 className="font-semibold text-slate-800">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(skill => (
                                    <div key={skill} className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                                        {skill}
                                        <button onClick={() => removeSkill(skill)} className="ml-2 text-xs">x</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <h4 className="font-semibold text-slate-800">Interests</h4>
                            <div className="flex flex-wrap gap-2">
                                {interests.map(interest => (
                                    <div key={interest} className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                                        {interest}
                                        <button onClick={() => removeInterest(interest)} className="ml-2 text-xs">x</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 5: return (
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Your Profile</h2>
                    <p className="mt-2 text-slate-600">Complete your profile information.</p>
                    <div className="space-y-4 max-w-lg mx-auto mt-8">
                        <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Headline" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                        <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm h-32 resize-none" />
                        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                        <select value={timeZone} onChange={e => setTimeZone(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            <option value="">Select Time Zone</option>
                            {timezones.map(tz => (
                                <option key={tz.tzCode} value={tz.tzCode}>{tz.label} ({tz.tzCode})</option>
                            ))}
                        </select>
                        <select value={careerStage} onChange={e => setCareerStage(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            <option value="">Select Career Stage</option>
                            {careerStages.map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </div>
                </div>
            );
            case 6: return (
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Referral</h2>
                    <p className="mt-2 text-slate-600">How did you hear about ChronoVue?</p>
                    <div className="space-y-4 max-w-xl mx-auto mt-8">
                        <select value={referralSource} onChange={e => setReferralSource(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                            <option value="">Select Referral Source</option>
                            {referralSources.map(source => (
                                <option key={source} value={source}>{source}</option>
                            ))}

                        </select>
                        {referralSource === 'Having Referral ID' && (
                            <input type="text" placeholder="Enter Referral ID" className="w-full mt-4 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                value={referralId}
                            />
                        )}
                    </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Onboarding ({step + 1} of {totalSteps})</h1>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 my-4">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${((step + 1) / totalSteps) * 100}%` }}></div>
                    </div>
                </div>
                {renderStepContent()}
                <div className="mt-8 flex justify-between">
                    <button onClick={prevStep} disabled={step === 0} className="bg-slate-200 text-slate-700 rounded-lg py-2 px-4 hover:bg-slate-300 disabled:opacity-50">
                        <ArrowLeft className="w-4 h-4 inline" /> Back
                    </button>
                    {step === totalSteps - 1 ? (
                        <button onClick={handleSubmit} className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700">
                            {loading ? <Loader className="w-4 h-4 inline animate-spin" /> : 'Finish'}
                        </button>
                    ) : (
                        <button onClick={nextStep} className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700">
                            Next <ArrowRight className="w-4 h-4 inline" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}