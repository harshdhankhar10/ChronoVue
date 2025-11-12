import React from 'react'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { Users, MessageCircle } from 'lucide-react'
import { Metadata } from 'next'
import { accessDenied } from '../timeline/page'

export const metadata: Metadata = {
  title: 'My Spaces - ChronoVue Community',
  description: 'Discover and manage the communities you are part of on ChronoVue Community.',
}



const page = async () => {
  const session = await getServerSession(NEXT_AUTH)
    if (!session) {
    return (
      accessDenied
    )
  }

  const userSpaces = await prisma.communitySpace.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id
        }
      }
    },
    include: {
      owner: {
        select: {
          fullName: true
        }
      },
      _count: {
        select: {
          members: true,
          posts: true
        }
      }
    }
  })

  return (
    <div>
        <div>
            <h1 className="text-3xl font-bold mb-6">My Spaces</h1>
            <p className="text-gray-600 mb-8">Explore and manage the communities you're part of.</p>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userSpaces.map((community) => (
              <Link 
                key={community.id}
                href={`/community/v/${community.slug}`}
                className="bg-white rounded-xl border p-6 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">{community.name}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {community.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community._count.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{community._count.posts} posts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>By {community.owner.fullName}</span>
                  <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                    {community.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>

    </div>
  )
}

export default page

