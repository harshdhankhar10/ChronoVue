import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import CommunityHomepage from '@/components/Community/CommunityHomepage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Spaces - ChronoVue',
  description: 'Explore and join community spaces to connect with like-minded individuals.',
}
const page = async() => {

  const session = await getServerSession(NEXT_AUTH)
  let user = null
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
  }

  const allCommunities = await prisma.communitySpace.findMany({
    where : {isPrivate : false, isVerified: true},
    include: { members: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  
  const myCommunities = user ? await prisma.communitySpace.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: { members: true, },
    orderBy: {
      createdAt: 'desc',
    },
  }) : []



  return (
    <>
      <CommunityHomepage allCommunities={allCommunities} myCommunities={myCommunities} userId = {user?.id} />

    </>
  )
}

export default page