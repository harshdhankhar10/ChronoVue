"use client"
import React, { useEffect, useState } from 'react'
import { Briefcase, GraduationCap, Clock, DollarSign, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import VerificationStep from './MentorApply Steps/VerificationStep'
import PersonalInfoStep from './MentorApply Steps/PersonalInfoStep' 
import ProfessionalBackgroundStep from './MentorApply Steps/ProfessionalBackgroundStep'
import WorkExperienceStep from './MentorApply Steps/WorkExperienceStep'
import SocialSpecializationsStep from './MentorApply Steps/SocialSpecializationsStep'
import MentorshipDetailsStep from './MentorApply Steps/MentorshipDetailsStep'
import ApplicationQuestionsStep from './MentorApply Steps/ApplicationQuestionsStep'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

interface User {
    Profile: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        headline: string | null;
        location: string | null;
        timezone: string | null;
    } | null;
    id: string;
    email: string;
    username: string;
    fullName: string | null;
    phoneNumber: string | null;
    isMentor: boolean;
    role: string;
    status: string;
    isVerified: boolean;
    lastLogin: Date | null;
    credits: number;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserProps {
    user: User
}

interface SocialProfile {
    platform: string;
    url: string;
}

interface JobExperience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

interface ApplicationQuestion {
    question: string;
    answer: string;
}

interface AvailabilitySlot {
    day: string;
    startTime: string;
    endTime: string;
}

const ApplyForMentor = ({ user }: UserProps) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [isInitialVerifiedState, setIsInitialVerifiedState] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const data = localStorage.getItem('isInitialVerifiedState');
        if (data) {
            setIsInitialVerifiedState(JSON.parse(data));
        }
    }, [])

    const [formData, setFormData] = useState({
        bio: '',
        expertise: [] as string[],
        experienceYears: 0,
        timezone: user.Profile?.timezone || '',
        availabilitySlots: [] as AvailabilitySlot[],
        currentJob: {
            title: '',
            company: '',
            startDate: '',
            current: true,
            description: ''
        } as JobExperience,
        pastJobs: [] as JobExperience[],
        socialProfiles: [] as SocialProfile[],
        technicalSkills: [] as string[],
        softSkills: [] as string[],
        certifications: [] as any[],
        specializations: [] as string[],
        mentoringCategories: [] as string[],
        targetAudiences: [] as string[],
        sessionTypesOffered: [] as string[],
        rate: 0,
        currency: 'INR',
        applicationQuestions: [
            {
                question: "What motivates you to become a mentor?",
                answer: ""
            },
            {
                question: "Describe your mentoring approach?",
                answer: ""
            },
            {
                question: "Share a mentoring success story?",
                answer: ""
            }
        ] as ApplicationQuestion[],
        isAgreedToTerms: false,
        codeOfConductAgreement: false,
        backgroundCheckAgreement: false
    })

    const steps = [
        { number: 1, title: 'Personal Info', icon: Briefcase },
        { number: 2, title: 'Professional', icon: GraduationCap },
        { number: 3, title: 'Experience', icon: Clock },
        { number: 4, title: 'Social', icon: CheckCircle },
        { number: 5, title: 'Mentorship', icon: DollarSign },
        { number: 6, title: 'Application', icon: CheckCircle }
    ]

    const handleNext = () => {
        if (currentStep < 6) setCurrentStep(currentStep + 1)
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmitApplication = async () => {
        setLoading(true)
        try {
            const response = await axios.post("/api/dashboard/mentor/apply", {
                formData
            })
            if(response.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted',
                    text: 'Your mentor application has been submitted successfully!',
                }).then(() => {
                    router.push("/dashboard/user/mentor")
                })
            }
        } catch (error:any) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: error.response?.data?.error || 'An error occurred while submitting your application. Please try again later.',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleArrayInput = (field: string, value: string, checked: boolean) => {
        setFormData(prev => {
            const currentArray = prev[field as keyof typeof prev] as string[]
            return checked 
                ? { ...prev, [field]: [...currentArray, value] }
                : { ...prev, [field]: currentArray.filter(item => item !== value) }
        })
    }

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    if (!isInitialVerifiedState) {
        return <VerificationStep user={user} setIsInitialVerifiedState={setIsInitialVerifiedState} />
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Become a Mentor
                    </h1>
                    <p className="text-gray-600">
                        Share your knowledge and help others grow
                    </p>
                </div>

                <div className="bg-white rounded-lg border p-6 mb-8">
                    <div className="flex flex-wrap justify-center gap-16">
                        {steps.map((step) => (
                            <div key={step.number} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                    currentStep >= step.number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                                </div>
                                <span className={`ml-2 font-medium ${
                                    currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                                }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg border">
                    {currentStep === 1 && <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} />}
                    {currentStep === 2 && <ProfessionalBackgroundStep formData={formData} handleArrayInput={handleArrayInput} />}
                    {currentStep === 3 && <WorkExperienceStep formData={formData} setFormData={setFormData} />}
                    {currentStep === 4 && <SocialSpecializationsStep formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />}
                    {currentStep === 5 && <MentorshipDetailsStep formData={formData} handleArrayInput={handleArrayInput} handleInputChange={handleInputChange} />}
                    {currentStep === 6 && <ApplicationQuestionsStep formData={formData} handleInputChange={handleInputChange} />}

                    <div className="flex justify-between p-6 border-t">
                        <Button type="button" onClick={handleBack} disabled={currentStep === 1} variant="outline">
                            Back
                        </Button>
                        
                        {currentStep < 6 ? (
                            <Button type="button" onClick={handleNext}>
                                Continue
                            </Button>
                        ) : (
                            <Button 
                                type="button" 
                                onClick={handleSubmitApplication} 
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Application'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyForMentor