import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface JobExperience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

interface FormData {
    currentJob: JobExperience;
    pastJobs: JobExperience[];
}

interface WorkExperienceStepProps {
    formData: FormData;
    setFormData: (data: any) => void;
}

const WorkExperienceStep = ({ formData, setFormData }: WorkExperienceStepProps) => {
    const [newPastJob, setNewPastJob] = useState<JobExperience>({
        title: '', company: '', startDate: '', endDate: '', current: false, description: ''
    })

    const addPastJob = () => {
        if (newPastJob.title && newPastJob.company) {
            setFormData((prev: FormData) => ({
                ...prev,
                pastJobs: [...prev.pastJobs, newPastJob]
            }))
            setNewPastJob({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' })
        }
    }

    const removePastJob = (index: number) => {
        setFormData((prev: FormData) => ({
            ...prev,
            pastJobs: prev.pastJobs.filter((_, i) => i !== index)
        }))
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Work Experience</h2>
            <div className="space-y-6">
                <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Current Position</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Job Title"
                            value={formData.currentJob.title}
                            onChange={(e) => setFormData((prev: FormData) => ({
                                ...prev,
                                currentJob: { ...prev.currentJob, title: e.target.value }
                            }))}
                        />
                        <Input
                            placeholder="Company"
                            value={formData.currentJob.company}
                            onChange={(e) => setFormData((prev: FormData) => ({
                                ...prev,
                                currentJob: { ...prev.currentJob, company: e.target.value }
                            }))}
                        />
                        <Textarea
                            placeholder="Description"
                            value={formData.currentJob.description}
                            onChange={(e) => setFormData((prev: FormData) => ({
                                ...prev,
                                currentJob: { ...prev.currentJob, description: e.target.value }
                            }))}
                            className="md:col-span-2"
                            rows={3}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Previous Positions</h3>
                    <div className="space-y-4 mb-4">
                        {formData.pastJobs.map((job, index) => (
                            <div key={index} className="border rounded-lg p-4 flex justify-between">
                                <div>
                                    <h4 className="font-medium">{job.title} at {job.company}</h4>
                                    <p className="text-sm text-gray-600">{job.startDate} - {job.endDate}</p>
                                </div>
                                <button onClick={() => removePastJob(index)} className="text-red-600">Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="border rounded-lg p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                placeholder="Job Title"
                                value={newPastJob.title}
                                onChange={(e) => setNewPastJob({ ...newPastJob, title: e.target.value })}
                            />
                            <Input
                                placeholder="Company"
                                value={newPastJob.company}
                                onChange={(e) => setNewPastJob({ ...newPastJob, company: e.target.value })}
                            />
                            <Input
                                placeholder="Start Date"
                                value={newPastJob.startDate}
                                onChange={(e) => setNewPastJob({ ...newPastJob, startDate: e.target.value })}
                            />
                            <Input
                                placeholder="End Date"
                                value={newPastJob.endDate}
                                onChange={(e) => setNewPastJob({ ...newPastJob, endDate: e.target.value })}
                            />
                        </div>
                        <Textarea
                            placeholder="Description"
                            value={newPastJob.description}
                            onChange={(e) => setNewPastJob({ ...newPastJob, description: e.target.value })}
                            rows={2}
                        />
                        <Button type="button" onClick={addPastJob} className="w-full">Add Previous Position</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkExperienceStep