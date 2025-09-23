import React from 'react'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { NEXT_AUTH } from '@/utils/auth'
import ViewTimelineInfo from '@/components/Dashboard/Timelines/ViewTimelineInfo'

const page = async ({params} : {params: {id: string}}) => {
  const session = await getServerSession(NEXT_AUTH)

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || ''
    },
  })

  const timeline = await prisma.timeline.findUnique({
    where: {
      id: params.id
    },
    include: {
      milestones: {
        include: {
          SubTask: true,
          Reflection: true
        },
        orderBy: {
          targetDate: 'asc'
        }
      }
    }
  })

  if (!timeline) {
    return <div className="p-8 text-center">Timeline not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ViewTimelineInfo timeline={timeline} />
    </div>
  )
}

export default page