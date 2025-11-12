import JoinPrivateCommunity from '@/components/Community/JoinPrivateCommunity'
import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'
import { accessDenied } from '../(Sidebar Items)/timeline/page'

export const metadata: Metadata = {
    title: 'Join Private Community - ChronoVue ',
    description: 'Join a private community to connect with like-minded individuals and share your interests.',
}


const page = async() => {
    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        return (
           accessDenied
        )
    }
  return (
    <>
        <JoinPrivateCommunity/>
    </>
  )
}

export default page