"use client"
import React, { useState } from 'react'
import { Mail, Phone, Calendar, Star, MessageCircle, TrendingUp } from 'lucide-react'

const StudentsPage = () => {
    const [activeTab, setActiveTab] = useState('all')
    
    const students = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            phone: "+91 98765 43210",
            joinDate: new Date(2024, 0, 15),
            sessionsCompleted: 8,
            upcomingSessions: 2,
            averageRating: 4.8,
            progress: "Advanced",
            goals: ["Full-stack Development", "Job Placement"],
            lastSession: new Date(2024, 0, 25),
            notes: "Quick learner, strong fundamentals"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob.smith@example.com",
            phone: "+91 98765 43211", 
            joinDate: new Date(2024, 0, 10),
            sessionsCompleted: 12,
            upcomingSessions: 1,
            averageRating: 4.9,
            progress: "Expert",
            goals: ["System Design", "Tech Leadership"],
            lastSession: new Date(2024, 0, 24),
            notes: "Excellent problem-solving skills"
        },
        {
            id: 3,
            name: "Carol Davis",
            email: "carol.davis@example.com",
            phone: "+91 98765 43212",
            joinDate: new Date(2024, 0, 5),
            sessionsCompleted: 5,
            upcomingSessions: 0,
            averageRating: 4.7,
            progress: "Intermediate",
            goals: ["Frontend Mastery", "React Expert"],
            lastSession: new Date(2024, 0, 20),
            notes: "Needs more practice with state management"
        },
        {
            id: 4,
            name: "David Wilson",
            email: "david.wilson@example.com", 
            phone: "+91 98765 43213",
            joinDate: new Date(2024, 0, 20),
            sessionsCompleted: 3,
            upcomingSessions: 1,
            averageRating: 4.6,
            progress: "Beginner",
            goals: ["Career Switch", "Web Development"],
            lastSession: new Date(2024, 0, 26),
            notes: "Motivated, starting from basics"
        }
    ]

    const getProgressColor = (progress: string) => {
        switch (progress) {
            case 'Beginner': return 'bg-yellow-100 text-yellow-800'
            case 'Intermediate': return 'bg-blue-100 text-blue-800'
            case 'Advanced': return 'bg-green-100 text-green-800'
            case 'Expert': return 'bg-purple-100 text-purple-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Students</h1>
                    <p className="text-gray-600 mt-2">Manage your students and track their progress</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Students</p>
                                <p className="text-2xl font-bold text-gray-900">24</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Students</p>
                                <p className="text-2xl font-bold text-gray-900">18</p>
                            </div>
                            <MessageCircle className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Avg Sessions</p>
                                <p className="text-2xl font-bold text-gray-900">7.2</p>
                            </div>
                            <Calendar className="h-8 w-8 text-purple-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Avg Rating</p>
                                <p className="text-2xl font-bold text-gray-900">4.8</p>
                            </div>
                            <Star className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Student Directory</h2>
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                                    Add Student
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {students.map((student) => (
                                <div key={student.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(student.progress)}`}>
                                                    {student.progress}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1 text-yellow-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="text-sm font-medium">{student.averageRating}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Mail className="h-4 w-4" />
                                            <span>{student.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Phone className="h-4 w-4" />
                                            <span>{student.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Calendar className="h-4 w-4" />
                                            <span>Joined {student.joinDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{student.sessionsCompleted}</p>
                                            <p className="text-xs text-gray-600">Completed</p>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-gray-900">{student.upcomingSessions}</p>
                                            <p className="text-xs text-gray-600">Upcoming</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-900">Goals:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {student.goals.slice(0, 2).map((goal, index) => (
                                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                    {goal}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 mt-4">
                                        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                                            Message
                                        </button>
                                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                                            Schedule
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsPage