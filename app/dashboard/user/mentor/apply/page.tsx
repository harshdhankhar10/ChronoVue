import ApplyForMentor from '@/components/Dashboard/Mentor/ApplyForMentor'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { AlertCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await getServerSession(NEXT_AUTH)
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || undefined,
        },
        include : {
            Profile: true,
        }
    })
    const mentorProfile = await prisma.mentorProfile.findUnique({
        where: {
            userId: user?.id || '',
        },
    })
    if(!mentorProfile?.isActive && !mentorProfile?.isVerified){
        redirect('/dashboard/mentor')
    }
    
   
  return (
    <>
    <ApplyForMentor user={user!} />
    </>
  )
}

export default page