"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { Users, ArrowRight, Lock, Shield, Plus } from 'lucide-react'
import { Button } from '../ui/button'

interface User {
  id: string
  name: string
  email: string
}

interface Community {
  id: string
  name: string
  slug: string
  description: string
  coverImage?: string | null
  isPrivate: boolean
  isVerified: boolean
  category: string
  members: Array<{
    id: string
    userId: string
    isApproved: boolean
  }>
  createdAt: Date
}

interface CommunityHomepageProps {
  allCommunities: Community[]
  myCommunities: Community[]
  userId : string | undefined
}

const CommunityHomepage = ({ allCommunities, myCommunities, userId }: CommunityHomepageProps) => {
  const router = useRouter()

  const isApproved = (community: Community, userId: string | undefined) => {
    if (!userId) return false
    const member = community.members.find(m => m.userId === userId && m.isApproved)
    return member ? true : false
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
     
        {myCommunities.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Communities</h2>
              <button 
                onClick={() => router.push('/community/your-communities')}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
              >
                View all <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCommunities.slice(0, 6).map((community) => (
                <div 
                  key={community.id}
                  onClick={() => {isApproved(community, userId) ? router.push(`/community/v/${community.slug}`) : null}}
                  
                  className={`bg-white rounded-lg border p-6 cursor-pointer ${!isApproved(community, userId) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-900">{community.name}</h3>
                    <div className="">
                      {!isApproved(community, userId) && (
                        <span className="text-sm text-red-600 font-semibold">Pending Approval</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {!community.isVerified && <span className="text-sm text-red-600 font-semibold">Not Verified</span>}
                      {community.isPrivate && <Lock className="h-4 w-4 text-gray-400" />}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {community.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{community.members.length} members</span>
                    </div>
                    <span className="capitalize">{community.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {myCommunities.length > 0 ? 'Discover More Communities' : 'Public Communities'}
            </h2>
            <button 
              onClick={() => router.push('/community/discover')}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              Explore all <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCommunities.map((community) => (
              <div 
                key={community.id}
                onClick={() => router.push(`/community/v/${community.slug}`)}
                className="bg-white rounded-lg border p-6 cursor-pointer "
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">{community.name}</h3>
                  <div className="flex gap-1">
                    {community.isVerified && <Shield className="h-4 w-4 text-orange-600" />}
                    {community.isPrivate && <Lock className="h-4 w-4 text-gray-400" />}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {community.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community.members.length} members</span>
                  </div>
                  <span className="capitalize">{community.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      
      </div>
    </div>
  )
}

export default CommunityHomepage