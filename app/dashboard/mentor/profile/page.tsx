"use client"
import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Globe, Briefcase, Award, Users, DollarSign, Save, Camera } from 'lucide-react'

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const [profile, setProfile] = useState({
        personal: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "+91 98765 43210",
            location: "Mumbai, India",
            timezone: "Asia/Kolkata",
            bio: "Senior Software Engineer with 8+ years of experience in full-stack development. Passionate about mentoring and helping developers grow in their careers.",
            headline: "Senior Software Engineer | React & Node.js Specialist"
        },
        professional: {
            experienceYears: 8,
            expertise: ["React", "Node.js", "JavaScript", "TypeScript", "AWS", "System Design"],
            hourlyRate: 1200,
            currency: "INR",
            mentoringCategories: ["Career Growth", "Technical Skills", "Interview Prep"],
            sessionTypes: ["ONE_ON_ONE", "GROUP"]
        },
        social: {
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            portfolio: "https://johndoe.dev"
        }
    })

    const stats = {
        totalSessions: 42,
        studentsMentored: 24,
        averageRating: 4.8,
        responseRate: 95
    }

    const handleSave = async () => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLoading(false)
        setIsEditing(false)
    }

    const updateProfile = (section: string, field: string, value: any) => {
        setProfile(prev => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [field]: value
            }
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your mentor profile and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl border p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                            JD
                        </div>
                        <p className="text-lg font-semibold text-gray-900">{profile.personal.fullName}</p>
                        <p className="text-gray-600 text-sm">{profile.personal.headline}</p>
                        <div className="flex justify-center space-x-2 mt-4">
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border p-6 text-center">
                            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
                            <p className="text-sm text-gray-600">Total Sessions</p>
                        </div>
                        <div className="bg-white rounded-xl border p-6 text-center">
                            <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{stats.studentsMentored}</p>
                            <p className="text-sm text-gray-600">Students Mentored</p>
                        </div>
                        <div className="bg-white rounded-xl border p-6 text-center">
                            <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                            <p className="text-sm text-gray-600">Average Rating</p>
                        </div>
                        <div className="bg-white rounded-xl border p-6 text-center">
                            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
                            <p className="text-sm text-gray-600">Response Rate</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    isEditing 
                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <User className="h-4 w-4 mr-2" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profile.personal.fullName}
                                    onChange={(e) => updateProfile('personal', 'fullName', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={profile.personal.email}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={profile.personal.phoneNumber}
                                    onChange={(e) => updateProfile('personal', 'phoneNumber', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={profile.personal.location}
                                    onChange={(e) => updateProfile('personal', 'location', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Globe className="h-4 w-4 mr-2" />
                                    Timezone
                                </label>
                                <input
                                    type="text"
                                    value={profile.personal.timezone}
                                    onChange={(e) => updateProfile('personal', 'timezone', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Headline
                                </label>
                                <input
                                    type="text"
                                    value={profile.personal.headline}
                                    onChange={(e) => updateProfile('personal', 'headline', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            <textarea
                                value={profile.personal.bio}
                                onChange={(e) => updateProfile('personal', 'bio', e.target.value)}
                                disabled={!isEditing}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                            <div className="flex flex-wrap gap-2">
                                {profile.professional.expertise.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end space-x-3 pt-6 border-t">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />
                                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage