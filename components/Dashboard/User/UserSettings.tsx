'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  fullName: string
  email: string
  username: string
  profilePicture: string
  phoneNumber: string | null
  credits: number
}

interface UserSettingsProps {
  user: User
}

const UserSettings = ({ user }: UserSettingsProps) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    username: user.username
  })

  const router = useRouter()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isModalOpenForChangePassword, setIsModalOpenForChangePassword] = useState(false)
  const [isModalOpenForChangeProfilePicture, setIsModalOpenForChangeProfilePicture] = useState(false)

  const [imageUpload, setImageUpload] = useState<File | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY

  const handleUploadProfilePicture = async () => {
  if (!imageUpload) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please select an image first'
    })
    return
  }

  const fileSizeInMB = imageUpload.size / (1024 * 1024)
  const maxSizeMB = 5
  if (fileSizeInMB > maxSizeMB) {
    Swal.fire({
      icon: 'error',
      title: 'File too large',
      text: `Please select an image smaller than ${maxSizeMB}MB.`
    })
    return
  }

  setUploadLoading(true)

  const formData = new FormData()
  formData.append('image', imageUpload)

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 
      }
    )
    
    if (response.data.success) {
      const imageUrl = response.data.data.url
      
      const saveResponse = await axios.patch('/api/auth/update-profilePicture', {
        imageUrl
      })

      if (saveResponse.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile picture updated successfully'
        })
        setIsModalOpenForChangeProfilePicture(false)
        router.refresh()
      }
    }
  } catch (error: any) {
    console.error('Error uploading profile picture:', error)
    let errorMessage = 'An error occurred while uploading profile picture'
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Upload timeout. Please try again with a smaller image.'
    } else if (error.response?.status === 413) {
      errorMessage = 'File too large. Please select a smaller image.'
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error.message || errorMessage
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: errorMessage
    })
  } finally {
    setUploadLoading(false)
  }
}

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUpload(e.target.files[0])
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'account', name: 'Account', icon: '⚙️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' }
  ]

  const handleChangePassword = async () => {
    setLoading(true)
    if(newPassword !== confirmNewPassword){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Passwords do not match'
        })
        setLoading(false)
        return
    }
    try {
        const response = await axios.patch('/api/auth/change-password', {
            oldPassword,
            newPassword
        })
        if(response.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password changed successfully'
            })
            setIsModalOpenForChangePassword(false)
        }
        
    } catch (error:any) {
        console.error('Error changing password:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.error || 'An error occurred while changing password'
        })
    }finally{
        setLoading(false)
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 px-2">
      <div className="mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <img 
                    src={user.profilePicture} 
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{user.fullName}</div>
                    <div className="text-sm text-gray-500">{user.credits} credits</div>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="flex-1 p-6">
              {activeTab === 'profile' && (
                <div>
                 <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
                     <Button>
                        Save Changes
                     </Button>
                 </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Picture
                      </label>
                      <div className="flex items-center space-x-4">
                        <img 
                          src={user.profilePicture} 
                          alt={user.fullName}
                          className="w-16 h-16 rounded-full"
                        />
                        <Button variant={"link"} onClick={() => setIsModalOpenForChangeProfilePicture(true)}>
                          Change Photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <Input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        disabled
                        value={formData.email}
                        title='Email cannot be changed'
                        className='cursor-not-allowed'
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      />
                    </div>
                  </div>
                  
                </div>
              )}

              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Credits & Billing</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">Available Credits</div>
                            <div className="text-2xl font-bold text-orange-600">{user.credits}</div>
                          </div>
                          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                            Buy Credits
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                      <Button variant={"link"} onClick={() => setIsModalOpenForChangePassword(true)}>
                        Change Password
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
                      <div className="space-y-2">
                        <button className="text-red-600 font-medium block">
                          Delete Account
                        </button>
                        <button className="text-gray-600 font-medium block">
                          Export Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Email Notifications</div>
                        <div className="text-sm text-gray-500">Receive updates via email</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <Input type="checkbox" className="sr-only peer" disabled defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 cursor-not-allowed peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Milestone Reminders</div>
                        <div className="text-sm text-gray-500">Get reminded about upcoming milestones</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <Input type="checkbox" className="sr-only peer" disabled defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-not-allowed peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">AI Insight Alerts</div>
                        <div className="text-sm text-gray-500">Notifications when new insights are ready</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <Input type="checkbox" className="sr-only peer" disabled defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-not-allowed peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy & Security</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option>Public</option>
                        <option>Community Only</option>
                        <option>Private</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Data Privacy</h3>
                      <button className="text-orange-600 font-medium">
                        Download my data
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                      <button className="text-orange-600 font-medium">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              )}

             
            </div>
          </div>
        </div>
      </div>
    </div>

    
    {isModalOpenForChangePassword && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Old Password
                </label>
                <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <Input  type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
              </div>

              <div className="flex justify-end">
                <Button variant={"link"} onClick={() => setIsModalOpenForChangePassword(false)}>
                  Cancel
                </Button>
                <Button className="ml-4" onClick={handleChangePassword} disabled={loading}>
                  {loading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : 'Change Password'}
                </Button>
              </div>
            </div>
        </div>
        </div>
  )}



    {isModalOpenForChangeProfilePicture && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Change Profile Picture</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload New Profile Picture
                </label>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
                <div className="flex justify-end">
                    <Button variant={"link"} onClick={() => setIsModalOpenForChangeProfilePicture(false)}>
                        Cancel
                    </Button>
                    <Button 
                      className="ml-4" 
                      onClick={handleUploadProfilePicture} 
                      disabled={uploadLoading}
                    >
                      {uploadLoading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : 'Upload'}
                    </Button>
                </div>
            </div>
        </div>
      </div>
    )}

    </>
  )
}

export default UserSettings