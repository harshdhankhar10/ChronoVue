"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Share2, Calendar, User, X, Loader } from 'lucide-react'
import axios from 'axios'
import Swal from 'sweetalert2'

interface Milestone {
    id: string
    title: string
    description: string
    date: Date
    image?: string
}

interface Timeline {
    id: string
    title: string
    isPublic: boolean
    createdAt: Date
    milestones: Milestone[]
    user: {
        fullName: string | null
        email: string
        profilePicture?: string
    },
    communities: {
        id: string
        name: string
        description?: string | null
        createdAt: Date
        updatedAt: Date
    }[]
}

interface TimeLineProps {
    timelines: Timeline[]
}

const TimeLine = ({ timelines }: TimeLineProps) => {

    const [isModalOpenForShare, setIsModalOpenForShare] = React.useState(false);
    const [selectedTimelineId, setSelectedTimelineId] = React.useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const handleShareTimeline = async (timelineId: string) => {
        if(!selectedTimelineId) return;
        setLoading(true);
        try {
            const response = await axios.post('/api/community/post/timeline', {
                timelineId: selectedTimelineId,
                communityId: timelineId
            });
            if(response.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Timeline shared successfully!',
                });
                setIsModalOpenForShare(false);
            }
        } catch (error:any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.error || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <>
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Your Timelines
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Manage and share your timelines with others.
                    </p>
                </div>

                {timelines.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center">
                        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Timelines</h3>
                        <p className="text-gray-600">You haven't created any timelines yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {timelines.map((timeline) => (
                            <div key={timeline.id} className="bg-white rounded-xl border p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    {timeline.title}
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    By {timeline.user.fullName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button 
                                        onClick={() => {
                                            setSelectedTimelineId(timeline.id);
                                            setIsModalOpenForShare(true);
                                        }}
                                    >
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Share Timeline
                                    </Button>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold text-gray-900 mb-4">Milestones</h3>
                                    <div className="space-y-3">
                                        {timeline.milestones.map((milestone, index) => (
                                            <div key={milestone.id} className="flex items-start gap-4 p-3 border rounded-lg">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 text-sm font-semibold">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="font-semibold text-gray-900">
                                                            {milestone.title}
                                                        </h4>
                                                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                            {formatDate(new Date(milestone.date))}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">
                                                        {milestone.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-gray-500">
                                    <span>
                                        Created {formatDate(new Date(timeline.createdAt))}
                                    </span>
                                    <span className={`px-2 py-1 rounded ${
                                        timeline.isPublic 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {timeline.isPublic ? 'Public' : 'Private'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>


        {isModalOpenForShare && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-xl font-semibold">Share Timeline</h2>
                        <X onClick={() => setIsModalOpenForShare(false)} className='text-gray-700' />
                    </div>
                    <p className="mb-4">Select a community to share your timeline with:</p>
                    <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                        {timelines.find(t => t.id === selectedTimelineId)?.communities.map(community => (
                            <div key={community.id} className="flex items-center justify-between p-2 border-b">
                                <span className="font-semibold">{community.name}</span>
                                <Button onClick={() => handleShareTimeline(community.id)} disabled={loading}>
                                    {loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Share'}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        )}

        </>
    )
}

export default TimeLine