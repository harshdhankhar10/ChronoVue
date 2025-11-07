"use client"
import React from 'react'
import { Calendar, Users, DollarSign, Star, Clock, TrendingUp, MessageCircle, Video } from 'lucide-react'

const MentorDashboard = () => {
    const stats = {
        totalSessions: 42,
        studentsMentored: 24,
        totalEarnings: 125400,
        averageRating: 4.8,
        responseRate: 95,
        upcomingSessions: 3
    }

    const upcomingSessions = [
        {
            id: 1,
            student: "Alice Johnson",
            session: "React Advanced Patterns",
            time: "Today, 2:00 PM",
            duration: "60 mins",
            type: "ONE_ON_ONE"
        },
        {
            id: 2,
            student: "Group Session",
            session: "Node.js Workshop",
            time: "Tomorrow, 3:00 PM", 
            duration: "120 mins",
            type: "GROUP"
        },
        {
            id: 3,
            student: "Bob Smith",
            session: "System Design Prep",
            time: "Jan 28, 11:00 AM",
            duration: "60 mins",
            type: "ONE_ON_ONE"
        }
    ]

    const recentStudents = [
        {
            name: "Alice Johnson",
            sessions: 8,
            lastSession: "2 days ago",
            progress: "Advanced"
        },
        {
            name: "Bob Smith", 
            sessions: 12,
            lastSession: "1 day ago",
            progress: "Expert"
        },
        {
            name: "Carol Davis",
            sessions: 5,
            lastSession: "3 days ago",
            progress: "Intermediate"
        }
    ]

    const earningsData = [
        { month: 'Jan', earnings: 125400 },
        { month: 'Dec', earnings: 118200 },
        { month: 'Nov', earnings: 109800 }
    ]

    const getSessionIcon = (type: string) => {
        switch (type) {
            case 'ONE_ON_ONE': return <MessageCircle className="h-5 w-5 text-blue-600" />
            case 'GROUP': return <Users className="h-5 w-5 text-purple-600" />
            default: return <Video className="h-5 w-5 text-green-600" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className=" mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back! Here's your mentoring overview</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Sessions</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="flex items-center mt-2 text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+5 this week</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Students Mentored</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.studentsMentored}</p>
                            </div>
                            <Users className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="flex items-center mt-2 text-blue-600 text-sm">
                            <span>+3 new this month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="flex items-center mt-2 text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+12% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Average Rating</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                                    <div className="flex text-yellow-400">
                                        <Star className="h-5 w-5 fill-current" />
                                    </div>
                                </div>
                            </div>
                            <Star className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Response Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
                            </div>
                            <MessageCircle className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Upcoming Sessions</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.upcomingSessions}</p>
                            </div>
                            <Clock className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
                            <button className="text-blue-600 text-sm font-medium">View All</button>
                        </div>
                        <div className="space-y-4">
                            {upcomingSessions.map((session) => (
                                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            {getSessionIcon(session.type)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{session.session}</h3>
                                            <p className="text-sm text-gray-600">{session.student}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{session.time}</span>
                                                <span>•</span>
                                                <span>{session.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
                            <button className="text-blue-600 text-sm font-medium">View All</button>
                        </div>
                        <div className="space-y-4">
                            {recentStudents.map((student, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <span>{student.sessions} sessions</span>
                                                <span>•</span>
                                                <span>Last: {student.lastSession}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        student.progress === 'Expert' ? 'bg-purple-100 text-purple-800' :
                                        student.progress === 'Advanced' ? 'bg-green-100 text-green-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {student.progress}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings Overview</h2>
                        <div className="space-y-4">
                            {earningsData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="font-medium text-gray-900">{item.month}</span>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-48 bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-green-600 h-3 rounded-full"
                                                style={{ width: `${(item.earnings / 130000) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-semibold text-gray-900 w-20 text-right">
                                            ₹{item.earnings.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors">
                                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                <span className="font-medium text-gray-900">Schedule</span>
                            </button>
                            <button className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors">
                                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                <span className="font-medium text-gray-900">Students</span>
                            </button>
                            <button className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors">
                                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                <span className="font-medium text-gray-900">Earnings</span>
                            </button>
                            <button className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors">
                                <MessageCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                                <span className="font-medium text-gray-900">Messages</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorDashboard