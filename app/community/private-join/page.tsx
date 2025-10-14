import JoinPrivateCommunity from '@/components/Community/JoinPrivateCommunity'
import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Join Private Community - ChronoVue ',
    description: 'Join a private community to connect with like-minded individuals and share your interests.',
}


const page = async() => {
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        return (
            <>
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h1 className='text-2xl font-bold mb-4'>Login Required</h1>
                <p className='text-center bg-gray-100 p-4 rounded'>
                    You must be logged in to join a private community.
                </p>
                <Link href='/signin'>
                <Button className='mt-4'>Sign In</Button>
                </Link>
            </div>
            </>
        )
    }
  return (
    <>
        <JoinPrivateCommunity/>
    </>
  )
}

export default page