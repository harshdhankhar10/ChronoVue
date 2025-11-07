import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Upload } from 'lucide-react'

interface SocialProfile {
    platform: string;
    url: string;
}

interface FormData {
    socialProfiles: SocialProfile[];
    specializations: string[];
}

interface SocialSpecializationsStepProps {
    formData: FormData;
    setFormData: (data: any) => void;
    handleInputChange: (field: string, value: any) => void;
}

const SocialSpecializationsStep = ({ formData, setFormData, handleInputChange }: SocialSpecializationsStepProps) => {
    const [newSocialProfile, setNewSocialProfile] = useState<SocialProfile>({ platform: '', url: '' })
    const socialPlatforms = ['LinkedIn', 'GitHub', 'Twitter', 'Personal Website', 'Portfolio', 'Other']

    const addSocialProfile = () => {
        if (newSocialProfile.platform && newSocialProfile.url) {
            setFormData((prev: FormData) => ({
                ...prev,
                socialProfiles: [...prev.socialProfiles, { ...newSocialProfile }]
            }))
            setNewSocialProfile({ platform: '', url: '' })
        }
    }

    const removeSocialProfile = (index: number) => {
        setFormData((prev: FormData) => ({
            ...prev,
            socialProfiles: prev.socialProfiles.filter((_, i) => i !== index)
        }))
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Social Profiles & Specializations</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Social Profiles</h3>
                    <div className="space-y-4 mb-4">
                        {formData.socialProfiles.map((profile, index) => (
                            <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                                <div>
                                    <span className="font-medium capitalize">{profile.platform}: </span>
                                    <span className="text-blue-600">{profile.url}</span>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSocialProfile(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="border rounded-lg p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Platform
                                </label>
                                <select
                                    value={newSocialProfile.platform}
                                    onChange={(e) => setNewSocialProfile({ ...newSocialProfile, platform: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select platform</option>
                                    {socialPlatforms.map(platform => (
                                        <option key={platform} value={platform.toLowerCase()}>{platform}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile URL
                                </label>
                                <Input
                                    type="url"
                                    value={newSocialProfile.url}
                                    onChange={(e) => setNewSocialProfile({ ...newSocialProfile, url: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                        <Button type="button" onClick={addSocialProfile} className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Social Profile
                        </Button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specializations *
                    </label>
                    <Input
                        type="text"
                        required
                        value={formData.specializations.join(', ')}
                        onChange={(e) => handleInputChange('specializations', e.target.value.split(', '))}
                        placeholder="Enter your specializations separated by commas"
                    />
                    <p className="text-sm text-gray-500 mt-1">Separate multiple specializations with commas</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certifications
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                            Upload your certifications (optional)
                        </p>
                        <Button type="button" variant="outline" className="mt-2">
                            Choose Files
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialSpecializationsStep