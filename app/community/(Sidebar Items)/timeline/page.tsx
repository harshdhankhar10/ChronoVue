import TimeLine from '@/components/Community/SidebarItems/TimeLine'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'

const accessDenied = (
    <div className='text-center mt-10'>
      <h2 className='text-2xl font-bold'>Access Denied</h2>
      <p className='mt-4'>You must be logged in to view this page.</p>
    </div>
)

const page = async () => {
  const session = await getServerSession(NEXT_AUTH)

  if(!session){
    return accessDenied
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email || ''
    }
  })
  if(!user){
    return accessDenied
  }

  const timelines = await prisma.timeline.findMany({
    where: {
      userId: user.id
    },
    include: {
      milestones: {
        orderBy: { createdAt: 'asc' }
      },
      user: { 
        select: { 
          fullName: true, 
          email: true, 
          profilePicture: true 
        } 
      },
    },
    orderBy: { createdAt: 'desc' }
  })

  const communities = await prisma.communitySpace.findMany({
    where: {
      ownerId: user.id
    }
  })

  const timelineData = timelines.map(timeline => ({
    id: timeline.id,
    title: timeline.name,
    isPublic: timeline.isPublic,
    createdAt: timeline.createdAt,
    milestones: timeline.milestones.map(milestone => ({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description,
      date: milestone.createdAt,
      image: ""
    })),
    user: timeline.user,
    communities: communities.map(community => ({
      id: community.id,
      name: community.name,
      description: community.description,
      createdAt: community.createdAt,
      updatedAt: community.updatedAt
    }))
  }))


  return <TimeLine timelines={timelineData} />
}

export default page