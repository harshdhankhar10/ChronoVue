import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import ViewMentor from '@/components/Admin/Mentor/ViewMentor'

const Page = async ({params} : any) => {
    const {id} = params;
    
    const session = await getServerSession(NEXT_AUTH)

    const mentorApplication = await prisma.mentorProfile.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    profilePicture: true,
                    createdAt: true
                }
            }
        }
    })

    if (!mentorApplication) {
        return <div>Mentor application not found</div>
    }

    return <ViewMentor mentorApplication={mentorApplication} />
}

export default Page