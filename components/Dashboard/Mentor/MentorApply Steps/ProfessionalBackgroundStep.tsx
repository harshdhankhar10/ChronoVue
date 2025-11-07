import React from 'react'

interface FormData {
    expertise: string[];
    technicalSkills: string[];
    softSkills: string[];
}

interface ProfessionalBackgroundStepProps {
    formData: FormData;
    handleArrayInput: (field: string, value: string, checked: boolean) => void;
}

const ProfessionalBackgroundStep = ({ formData, handleArrayInput }: ProfessionalBackgroundStepProps) => {
    const expertiseAreas = [
        'Career Growth', 'Technical Skills', 'Leadership', 'Interview Prep',
        'Product Management', 'Software Development', 'Data Science', 'UX/UI Design',
        'Business Strategy', 'Startup Advice', 'Career Transition', 'Networking'
    ]

    const technicalSkillsOptions = [
        'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java',
        'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Data Analysis',
        'UI/UX Design', 'Product Management', 'Agile Methodology'
    ]

    const softSkillsOptions = [
        'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
        'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity'
    ]

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Background</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Areas of Expertise *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {expertiseAreas.map(area => (
                            <label key={area} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.expertise.includes(area)}
                                    onChange={(e) => handleArrayInput('expertise', area, e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{area}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Technical Skills *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {technicalSkillsOptions.map(skill => (
                            <label key={skill} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.technicalSkills.includes(skill)}
                                    onChange={(e) => handleArrayInput('technicalSkills', skill, e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{skill}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Soft Skills *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {softSkillsOptions.map(skill => (
                            <label key={skill} className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.softSkills.includes(skill)}
                                    onChange={(e) => handleArrayInput('softSkills', skill, e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{skill}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalBackgroundStep