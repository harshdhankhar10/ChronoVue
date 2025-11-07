"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Clock, User, Mail, Phone, MapPin, Globe, Briefcase, Award, Users, DollarSign, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Swal from 'sweetalert2'

interface UserInfo {
    id: string
    fullName: string | null
    email: string
    phoneNumber: string | null
    profilePicture: string | null
    createdAt: Date
}

interface MentorApplication {
    id: string
    userId: string
    bio: string | null
    expertise: string[]
    experienceYears: number | null
    timezone: string | null
    availabilitySlots: any[]
    currentJob: any
    pastJobs: any[]
    socialProfiles: any[]
    technicalSkills: string[]
    softSkills: string[]
    certifications: any[]
    specializations: string[]
    mentoringCategories: string[]
    targetAudiences: string[]
    sessionTypesOffered: string[]
    rate: number
    currency: string
    applicationQuestions: any[]
    isVerified: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    user: UserInfo
}

interface ViewMentorProps {
    mentorApplication: MentorApplication
}

const ViewMentor = ({ mentorApplication }: ViewMentorProps) => {
    const [loading, setLoading] = useState(false)
    const [modalOpenForRejection, setModalOpenForRejection] = useState(false)
    const [additionalInfo, setAdditionalInfo] = useState({ reason: '', details: '' })

    const handleApprove = async () => {
        setLoading(true)
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You are about to approve this mentor application.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, approve it!',
                cancelButtonText: 'Cancel'
            }).then( async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.post('/api/admin/mentor-applications/application/action', {
                applicationId: mentorApplication.id,
                action: 'APPROVE',
                userId: mentorApplication.userId,
                mentorId: mentorApplication.id,
                additionalInfo: {}
            })
            if (response.status === 201) {
               Swal.fire({
                icon: 'success',
                title: 'Application Approved',
                text: 'The mentor application has been approved and the user has been notified.',
               }).then(() => {
                window.location.reload();
               });
            }
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error approving the application.'
            });
        }finally{
            setLoading(false)
        }
    }

    const handleReject = async () => {
        setLoading(true)
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You are about to reject this mentor application.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, reject it!',
                cancelButtonText: 'Cancel'
            }).then( async (result) => {
                if (result.isConfirmed) {
                    setLoading(true)
                    const response = await axios.post('/api/admin/mentor-applications/application/action', {
                applicationId: mentorApplication.id,
                action: 'REJECT',
                userId: mentorApplication.userId,
                mentorId: mentorApplication.id,
                additionalInfo
            })
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Rejected',
                    text: 'The mentor application has been rejected and the user has been notified.',
                }).then(() => {
                    window.location.reload();
                });
            }   
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error rejecting the application.'
            });
        }finally{
                setLoading(false)
            }
        }

    const getStatusInfo = () => {
        if (!mentorApplication.isActive) return { text: 'Rejected', color: 'text-red-600', bg: 'bg-red-100' }
        if (mentorApplication.isVerified) return { text: 'Approved', color: 'text-green-600', bg: 'bg-green-100' }
        return { text: 'Pending Review', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    }

    const statusInfo = getStatusInfo()

    return (
       <>
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Mentor Application</h1>
                    <p className="text-gray-600">Review and manage mentor application details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg border shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start space-x-4 mb-6">
                                    {mentorApplication.user.profilePicture ? (
                                        <img 
                                            src={mentorApplication.user.profilePicture} 
                                            alt={mentorApplication.user.fullName || ''}
                                            className="w-16 h-16 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                            {mentorApplication.user.fullName?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {mentorApplication.user.fullName || 'Unknown User'}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                                                {statusInfo.text}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-4 w-4" />
                                                <span>{mentorApplication.user.email}</span>
                                            </div>
                                            {mentorApplication.user.phoneNumber && (
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="h-4 w-4" />
                                                    <span>{mentorApplication.user.phoneNumber}</span>
                                                </div>
                                            )}
                                            {mentorApplication.timezone && (
                                                <div className="flex items-center space-x-2">
                                                    <Globe className="h-4 w-4" />
                                                    <span>{mentorApplication.timezone}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center space-x-2">
                                                <Briefcase className="h-4 w-4" />
                                                <span>{mentorApplication.experienceYears} years experience</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {mentorApplication.bio && (
                                    <div className="mb-6">
                                        <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                                        <p className="text-gray-700 leading-relaxed">{mentorApplication.bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">Professional Background</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">Areas of Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {mentorApplication.expertise.map((skill, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Technical Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {mentorApplication.technicalSkills.map((skill, index) => (
                                                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Soft Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {mentorApplication.softSkills.map((skill, index) => (
                                                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">Specializations</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {mentorApplication.specializations.map((spec, index) => (
                                            <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {mentorApplication.currentJob && (
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="font-semibold text-gray-900 mb-1">Current Position</h4>
                                        <p className="text-gray-700 font-medium">{mentorApplication.currentJob.title} at {mentorApplication.currentJob.company}</p>
                                        {mentorApplication.currentJob.description && (
                                            <p className="text-gray-600 mt-2">{mentorApplication.currentJob.description}</p>
                                        )}
                                    </div>
                                )}

                                {mentorApplication.pastJobs.length > 0 && (
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-3">Previous Positions</h4>
                                        <div className="space-y-4">
                                            {mentorApplication.pastJobs.map((job, index) => (
                                                <div key={index} className="border-l-4 border-gray-300 pl-4">
                                                    <p className="font-medium text-gray-900">{job.title} at {job.company}</p>
                                                    <p className="text-sm text-gray-600">{job.startDate} - {job.endDate}</p>
                                                    {job.description && (
                                                        <p className="text-gray-600 mt-1 text-sm">{job.description}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {mentorApplication.applicationQuestions && mentorApplication.applicationQuestions.length > 0 && (
                            <div className="bg-white rounded-lg border shadow-sm">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold text-gray-900">Application Questions</h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    {mentorApplication.applicationQuestions.map((qa, index) => (
                                        <div key={index}>
                                            <h4 className="font-medium text-gray-900 mb-2">{qa.question}</h4>
                                            <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">Mentorship Details</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Hourly Rate</span>
                                    <span className="font-semibold text-gray-900">
                                        {mentorApplication.currency} {mentorApplication.rate}
                                    </span>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Mentoring Categories</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {mentorApplication.mentoringCategories.map((cat, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Target Audiences</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {mentorApplication.targetAudiences.map((aud, index) => (
                                            <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                                                {aud}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Session Types</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {mentorApplication.sessionTypesOffered.map((type, index) => (
                                            <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                                                {type.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {mentorApplication.socialProfiles.length > 0 && (
                            <div className="bg-white rounded-lg border shadow-sm">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold text-gray-900">Social Profiles</h2>
                                </div>
                                <div className="p-6 space-y-2">
                                    {mentorApplication.socialProfiles.map((profile, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="capitalize text-gray-600">{profile.platform}</span>
                                            <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                                View Profile
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-lg border shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">Actions</h2>
                            </div>
                            <div className="p-6 space-y-3">
                                <Button 
                                    onClick={handleApprove} 
                                    disabled={loading || mentorApplication.isVerified}
                                    className="w-full"
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {loading ? 'Processing...' : 'Approve Application'}
                                </Button>
                                <Button 
                                    onClick={() => setModalOpenForRejection(true)}
                                    disabled={loading || !mentorApplication.isActive}
                                    variant="destructive"
                                    className="w-full "
                                >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    {loading ? 'Processing...' : 'Reject Application'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {modalOpenForRejection && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Reject Mentor Application</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Rejection</label>
                            <Input value={additionalInfo.reason} onChange={(e) => setAdditionalInfo({...additionalInfo, reason: e.target.value})}
                            type="text" placeholder="Enter reason for rejection" className="w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                            <textarea value={additionalInfo.details} onChange={(e) => setAdditionalInfo({...additionalInfo, details: e.target.value})}
                             className="w-full border border-gray-300 rounded-md p-2" rows={4} placeholder="Provide additional details (optional)"></textarea>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button variant="ghost" onClick={() => setModalOpenForRejection(false)}>Cancel</Button>
                            <Button 
                                variant="destructive"
                                onClick={handleReject}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Confirm Rejection'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
       </>
    )
}

export default ViewMentor