"use client"

import React, { useState } from 'react';
import { Loader, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface Timeline {
    name: string;
    category: string;
    duration: string;
    startDate: Date;
    endDate: Date;
    risks: string[];
    resources: string[];
}

interface Milestone {
    title: string;
    targetDate: Date;
    description: string;
    priority: string;
    status: string;
    tags: string[];
}

const TimelineCreation = () => {
    const categories = ['CAREER', 'EDUCATION', 'PERSONAL', 'FITNESS', 'FINANCE', 'ENTREPRENEURSHIP'];
    const durations = ['ONE_YEAR', 'THREE_YEARS', 'FIVE_YEARS'];
    const priorities = ['LOW', 'MEDIUM', 'HIGH'];
    const statuses = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];
    const router = useRouter();

    const [timeline, setTimeline] = useState<Timeline>({
        name: '',
        category: '',
        duration: '',
        startDate: new Date(),
        endDate: new Date(),
        risks: [],
        resources: [],
    });

    const [milestones, setMilestones] = useState<Milestone[]>([{
        title: '',
        targetDate: new Date(),
        description: '',
        priority: 'MEDIUM',
        status: 'NOT_STARTED',
        tags: []
    }]);

    const [riskInput, setRiskInput] = useState('');
    const [resourceInput, setResourceInput] = useState('');
    const [loading, setLoading] = useState(false);

    const addMilestone = () => {
        setMilestones([...milestones, {
            title: '',
            targetDate: new Date(),
            description: '',
            priority: 'MEDIUM',
            status: 'NOT_STARTED',
            tags: []
        }]);
    };

    const handleAddRisk = () => {
        if (!riskInput.trim()) return;
        if (!timeline.risks.includes(riskInput)) {
            setTimeline({ ...timeline, risks: [...timeline.risks, riskInput] });
            setRiskInput('');
        }
    };

    const handleAddResource = () => {
        if (!resourceInput.trim()) return;
        if (!timeline.resources.includes(resourceInput)) {
            setTimeline({ ...timeline, resources: [...timeline.resources, resourceInput] });
            setResourceInput('');
        }
    };

    const handleRemoveRisk = (index: number) => {
        const newRisks = timeline.risks.filter((_, i) => i !== index);
        setTimeline({ ...timeline, risks: newRisks });
    };

    const handleRemoveResource = (index: number) => {
        const newResources = timeline.resources.filter((_, i) => i !== index);
        setTimeline({ ...timeline, resources: newResources });
    };

    const removeMilestone = (index: number) => {
        const newMilestones = milestones.filter((_, i) => i !== index);
        setMilestones(newMilestones);
    };

    const handleMilestoneChange = (index: number, field: keyof Milestone, value: any) => {
        const newMilestones = [...milestones];
        newMilestones[index][field] = value;
        setMilestones(newMilestones);
    };

    const addTag = (index: number, tag: string) => {
        if (!tag.trim()) return;
        const newMilestones = [...milestones];
        if (!newMilestones[index].tags.includes(tag)) {
            newMilestones[index].tags.push(tag);
        }
        setMilestones(newMilestones);
    };

    const removeTag = (milestoneIndex: number, tagIndex: number) => {
        const newMilestones = [...milestones];
        newMilestones[milestoneIndex].tags.splice(tagIndex, 1);
        setMilestones(newMilestones);
    };

    const saveTimeline = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/dashboard/timelines/create", {
                timeline, milestones
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
                router.push('/dashboard/user/timelines');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.error || 'Something went wrong!',
                });
            }
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.error || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Create a New Timeline</h1>
                    <Button onClick={saveTimeline} disabled={loading}>
                        {loading ? <Loader className="animate-spin" /> : 'Save Timeline'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white p-6 rounded-md border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Core Details</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Timeline Name</label>
                                <Input
                                    value={timeline.name}
                                    onChange={(e) => setTimeline({ ...timeline, name: e.target.value })}
                                    placeholder="e.g., My Career Roadmap"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={timeline.category}
                                        onChange={(e) => setTimeline({ ...timeline, category: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="">Select...</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <select
                                        value={timeline.duration}
                                        onChange={(e) => setTimeline({ ...timeline, duration: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="">Select...</option>
                                        {durations.map(dur => (
                                            <option key={dur} value={dur}>{dur}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <div className="relative">
                                        <Input
                                            type="date"
                                            value={timeline.startDate.toISOString().split('T')[0]}
                                            onChange={(e) => setTimeline({ ...timeline, startDate: new Date(e.target.value) })}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <div className="relative">
                                        <Input
                                            type="date"
                                            value={timeline.endDate.toISOString().split('T')[0]}
                                            onChange={(e) => setTimeline({ ...timeline, endDate: new Date(e.target.value) })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-md border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Strategy</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Risks / Challenges</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={riskInput}
                                        onChange={(e) => setRiskInput(e.target.value)}
                                        placeholder="e.g., Time management, skill gaps..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddRisk();
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddRisk} className="whitespace-nowrap">
                                        Add
                                    </Button>
                                </div>
                                {timeline.risks.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {timeline.risks.map((risk, index) => (
                                            <div key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                                {risk}
                                                <button onClick={() => handleRemoveRisk(index)} className="ml-1 text-gray-400 hover:text-red-500">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resources Needed</label>
                                <div className="flex gap-2">
                                    <Input
                                        value={resourceInput}
                                        onChange={(e) => setResourceInput(e.target.value)}
                                        placeholder="e.g., Courses, mentors, tools..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddResource();
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddResource} className="whitespace-nowrap">
                                        Add
                                    </Button>
                                </div>
                                {timeline.resources.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {timeline.resources.map((resource, index) => (
                                            <div key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                                {resource}
                                                <button onClick={() => handleRemoveResource(index)} className="ml-1 text-gray-400 hover:text-red-500">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-end items-center">
                            <button
                                onClick={addMilestone}
                                className="flex items-center text-primary hover:text-blue-800 text-sm font-medium"
                            >
                                <Plus size={16} className="mr-1" />
                                Add Milestone
                            </button>
                        </div>
                        <div className="space-y-4">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="bg-white p-4 rounded-md border border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-medium text-gray-800">Milestone #{index + 1}</h3>
                                        <button
                                            onClick={() => removeMilestone(index)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <Input
                                                value={milestone.title}
                                                onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                                                placeholder="Milestone Title"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                value={milestone.description}
                                                onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                                                placeholder="Add a description or notes..."
                                                rows={2}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="relative">
                                                <Input
                                                    type="date"
                                                    value={milestone.targetDate.toISOString().split('T')[0]}
                                                    onChange={(e) => setMilestones(prev => {
                                                        const newMilestones = [...prev];
                                                        newMilestones[index].targetDate = new Date(e.target.value);
                                                        return newMilestones;
                                                    })}
                                                />
                                            </div>
                                            <select
                                                value={milestone.status}
                                                onChange={(e) => handleMilestoneChange(index, 'status', e.target.value)}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                            >
                                                {statuses.map(s => (
                                                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <select
                                            value={milestone.priority}
                                            onChange={(e) => handleMilestoneChange(index, 'priority', e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                        >
                                            {priorities.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                        <div className="border border-gray-300 rounded-md p-2">
                                            <Input
                                                placeholder="Add a tag and press Enter"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addTag(index, e.currentTarget.value);
                                                        e.currentTarget.value = '';
                                                    }
                                                }}
                                                className="flex-grow border-0 focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {milestone.tags.map((tag, tagIndex) => (
                                                <div key={tagIndex} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                                    {tag}
                                                    <button
                                                        onClick={() => removeTag(index, tagIndex)}
                                                        className="ml-1 text-gray-500 hover:text-gray-700"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineCreation;