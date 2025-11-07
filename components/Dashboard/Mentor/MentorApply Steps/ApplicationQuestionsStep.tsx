import React from 'react'
import { Textarea } from '@/components/ui/textarea'

interface ApplicationQuestion {
    question: string;
    answer: string;
}

interface FormData {
    applicationQuestions: ApplicationQuestion[];
    isAgreedToTerms: boolean;
    codeOfConductAgreement: boolean;
    backgroundCheckAgreement: boolean;
}

interface ApplicationQuestionsStepProps {
    formData: FormData;
    handleInputChange: (field: string, value: any) => void;
}

const ApplicationQuestionsStep = ({ formData, handleInputChange }: ApplicationQuestionsStepProps) => {
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Questions & Agreements</h2>
            <div className="space-y-8">
                <div className="space-y-6">
                    {formData.applicationQuestions.map((question, index) => (
                        <div key={index} className="border rounded-lg p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                {question.question}
                            </label>
                            <Textarea
                                value={question.answer}
                                onChange={(e) => {
                                    const updated = [...formData.applicationQuestions]
                                    updated[index].answer = e.target.value
                                    handleInputChange('applicationQuestions', updated)
                                }}
                                rows={4}
                            />
                        </div>
                    ))}
                </div>

                <div className="space-y-4 border-t pt-6">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.isAgreedToTerms}
                            onChange={(e) => handleInputChange('isAgreedToTerms', e.target.checked)}
                        />
                        <span>I agree to the terms and conditions</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.codeOfConductAgreement}
                            onChange={(e) => handleInputChange('codeOfConductAgreement', e.target.checked)}
                        />
                        <span>I agree to the code of conduct</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            checked={formData.backgroundCheckAgreement}
                            onChange={(e) => handleInputChange('backgroundCheckAgreement', e.target.checked)}
                        />
                        <span>I authorize background checks</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ApplicationQuestionsStep