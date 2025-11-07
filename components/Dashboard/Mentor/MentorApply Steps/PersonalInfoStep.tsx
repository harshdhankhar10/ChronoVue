import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface AvailabilitySlot {
    day: string;
    startTime: string;
    endTime: string;
}

interface FormData {
    bio: string;
    experienceYears: number;
    timezone: string;
    availabilitySlots: AvailabilitySlot[];
}

interface PersonalInfoStepProps {
    formData: FormData;
    handleInputChange: (field: string, value: any) => void;
}

const PersonalInfoStep = ({ formData, handleInputChange }: PersonalInfoStepProps) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const addAvailabilitySlot = (day: string) => {
        const newSlot = { day, startTime: '09:00', endTime: '17:00' }
        const exists = formData.availabilitySlots.some(slot => slot.day === day)
        if (exists) return
        const updatedSlots = [...formData.availabilitySlots, newSlot]
        handleInputChange('availabilitySlots', updatedSlots)
    }

    const removeAvailabilitySlot = (index: number) => {
        const updatedSlots = formData.availabilitySlots.filter((_, i) => i !== index)
        handleInputChange('availabilitySlots', updatedSlots)
    }

    const updateAvailabilitySlot = (index: number, field: string, value: string) => {
        const updatedSlots = formData.availabilitySlots.map((slot, i) => 
            i === index ? { ...slot, [field]: value } : slot
        )
        handleInputChange('availabilitySlots', updatedSlots)
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
                    <Textarea
                        required
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone *</label>
                    <Input
                        required
                        value={formData.timezone}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        placeholder="e.g., Asia/Kolkata"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                    <Input
                        type="number"
                        required
                        value={formData.experienceYears}
                        onChange={(e) => handleInputChange('experienceYears', parseInt(e.target.value))}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability Slots</label>
                    <div className="space-y-3">
                        {formData.availabilitySlots.map((slot, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 border rounded">
                                <span className="font-medium min-w-20">{slot.day}</span>
                                <Input
                                    type="time"
                                    value={slot.startTime}
                                    onChange={(e) => updateAvailabilitySlot(index, 'startTime', e.target.value)}
                                    className="w-32"
                                />
                                <span>to</span>
                                <Input
                                    type="time"
                                    value={slot.endTime}
                                    onChange={(e) => updateAvailabilitySlot(index, 'endTime', e.target.value)}
                                    className="w-32"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeAvailabilitySlot(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-wrap gap-2">
                            {days.map(day => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => addAvailabilitySlot(day)}
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                                >
                                    Add {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoStep