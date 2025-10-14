"use client"

import React, { useState } from 'react'
import { Lock, Shield, Users, ArrowLeft, Key } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const JoinPrivateCommunity = () => {
  const [joinCode, setJoinCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!joinCode.trim()) return
    setIsLoading(true)
    try {
      const response = await axios.post('/api/community/join-private', { joinCode })
      if (response.status === 201) {
       Swal.fire({
        icon: 'success',
        title: 'Join Request Successfully!',
        text: response.data.message
       }).then(() => {
        router.push('/community')
       })
      }
    } catch (error:any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.error || 'An error occurred while trying to join the community.',
      })
    }finally {
      setIsLoading(false)
    }
}

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 mt-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Join Private Community
            </h1>
            <p className="text-gray-600">
              Enter the Join Code provided by the community admin to join this private community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invitation Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="Enter join code"
                  required
                  className='pl-10'
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ask the community admin for the invitation code
              </p>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={!joinCode.trim() || isLoading}
                className='w-full flex items-center justify-center gap-2'
              >
                {isLoading ? 'Joining...' : 'Join Community'}
              </Button>
              
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  Private Community
                </h4>
                <p className="text-sm text-blue-700">
                  This community is private. You need an invitation code from an existing member to join.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinPrivateCommunity