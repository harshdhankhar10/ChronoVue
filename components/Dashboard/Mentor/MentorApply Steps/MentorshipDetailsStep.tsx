import React from 'react'
import { Input } from '@/components/ui/input'

interface FormData {
    mentoringCategories: string[];
    targetAudiences: string[];
    sessionTypesOffered: string[];
    rate: number;
}

interface MentorshipDetailsStepProps {
    formData: FormData;
    handleArrayInput: (field: string, value: string, checked: boolean) => void;
    handleInputChange: (field: string, value: any) => void;
}

const MentorshipDetailsStep = ({ formData, handleArrayInput, handleInputChange }: MentorshipDetailsStepProps) => {
    const expertiseAreas = [
        'Career Growth', 'Technical Skills', 'Leadership', 'Interview Prep',
        'Product Management', 'Software Development', 'Data Science', 'UX/UI Design',
        'Business Strategy', 'Startup Advice', 'Career Transition', 'Networking'
    ]


    const sessionTypes = ['ONE_ON_ONE', 'VIDEO_CALL', 'WEBINAR', 'WORKSHOP']

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Mentorship Details</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Mentoring Categories *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {expertiseAreas.map(category => (
                            <label key={category} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.mentoringCategories.includes(category)}
                                    onChange={(e) => handleArrayInput('mentoringCategories', category, e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Target Audiences *
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        {['Students', 'Early Career', 'Mid Career', 'Executives', 'All Levels'].map(audience => (
                            <label key={audience} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.targetAudiences.includes(audience)}
                                    onChange={(e) => handleArrayInput('targetAudiences', audience, e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{audience}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Session Types Offered *
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        {sessionTypes.map(type => (
                            <label key={type} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.sessionTypesOffered.includes(type)}
                                    onChange={(e) => handleArrayInput('sessionTypesOffered', type, e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{type.replace('_', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hourly Rate (INR) *
                    </label>
                    <Input
                        type="number"
                        required
                        value={formData.rate}
                        onChange={(e) => handleInputChange('rate', parseFloat(e.target.value))}
                        placeholder="Enter your hourly rate"
                    />
                </div>
              
            </div>
        </div>
    )
}

export default MentorshipDetailsStep