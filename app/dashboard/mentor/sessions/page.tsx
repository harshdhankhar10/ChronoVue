"use client"
import React, { useState } from 'react'
import { Video, MessageCircle, Users, Clock, Calendar, CheckCircle, XCircle, MoreVertical } from 'lucide-react'

const SessionsPage = () => {
    const [filter, setFilter] = useState('all')
    
    const sessions = [
        {
            id: 1,
            title: "React Fundamentals Masterclass",
            student: "Alice Johnson",
            type: "ONE_ON_ONE",
            date: new Date(2024, 0, 26, 10, 0),
            duration: 60,
            status: "completed",
            rating: 4.8,
            notes: "Great progress on useState and useEffect hooks",
            earnings: 1200
        },
        {
            id: 2,
            title: "Career Transition Strategy",
            student: "Bob Smith",
            type: "ONE_ON_ONE", 
            date: new Date(2024, 0, 26, 14, 0),
            duration: 90,
            status: "upcoming",
            rating: null,
            notes: "",
            earnings: 1800
        },
        {
            id: 3,
            title: "Advanced JavaScript Patterns",
            student: "Group Session",
            type: "GROUP",
            date: new Date(2024, 0, 27, 11, 0),
            duration: 120,
            status: "completed",
            rating: 4.9,
            notes: "Covered module patterns and design patterns",
            earnings: 3000
        },
        {
            id: 4,
            title: "System Design Interview Prep",
            student: "Carol Davis",
            type: "ONE_ON_ONE",
            date: new Date(2024, 0, 28, 9, 0),
            duration: 60,
            status: "cancelled",
            rating: null,
            notes: "Rescheduled for next week",
            earnings: 0
        },
        {
            id: 5,
            title: "Node.js Performance Optimization",
            student: "Group Session", 
            type: "GROUP",
            date: new Date(2024, 0, 29, 15, 0),
            duration: 90,
            status: "upcoming",
            rating: null,
            notes: "",
            earnings: 2700
        }
    ]

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'completed': return { color: 'bg-green-100 text-green-800', icon: CheckCircle }
            case 'upcoming': return { color: 'bg-blue-100 text-blue-800', icon: Clock }
            case 'cancelled': return { color: 'bg-red-100 text-red-800', icon: XCircle }
            default: return { color: 'bg-gray-100 text-gray-800', icon: Clock }
        }
    }

    const getTypeConfig = (type: string) => {
        switch (type) {
            case 'ONE_ON_ONE': return { color: 'bg-blue-500', icon: MessageCircle, label: '1:1' }
            case 'GROUP': return { color: 'bg-purple-500', icon: Users, label: 'Group' }
            default: return { color: 'bg-gray-500', icon: Video, label: 'Workshop' }
        }
    }

    const filteredSessions = sessions.filter(session => 
        filter === 'all' || session.status === filter
    )

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Sessions</h1>
                    <p className="text-gray-600 mt-2">Manage your mentoring sessions and track progress</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Sessions</p>
                                <p className="text-2xl font-bold text-gray-900">24</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">18</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Upcoming</p>
                                <p className="text-2xl font-bold text-gray-900">5</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Avg Rating</p>
                                <p className="text-2xl font-bold text-gray-900">4.8</p>
                            </div>
                            <div className="text-yellow-500">⭐</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Session History</h2>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    All
                                </button>
                                <button 
                                    onClick={() => setFilter('upcoming')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Upcoming
                                </button>
                                <button 
                                    onClick={() => setFilter('completed')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Completed
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            {filteredSessions.map((session) => {
                                const StatusIcon = getStatusConfig(session.status).icon
                                const typeConfig = getTypeConfig(session.type)
                                const TypeIcon = typeConfig.icon
                                
                                return (
                                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-lg ${typeConfig.color} bg-opacity-10`}>
                                                <TypeIcon className={`h-6 w-6 ${typeConfig.color.replace('bg-', 'text-')}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="font-semibold text-gray-900">{session.title}</h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusConfig(session.status).color}`}>
                                                        <StatusIcon className="h-3 w-3 inline mr-1" />
                                                        {session.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span>{session.student}</span>
                                                    <span>•</span>
                                                    <span>{session.date.toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span>{session.duration} min</span>
                                                    {session.rating && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="flex items-center">
                                                                ⭐ {session.rating}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                {session.notes && (
                                                    <p className="text-sm text-gray-600 mt-2">{session.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            {session.earnings > 0 && (
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">₹{session.earnings}</p>
                                                    <p className="text-sm text-gray-600">Earned</p>
                                                </div>
                                            )}
                                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                <MoreVertical className="h-5 w-5 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionsPage