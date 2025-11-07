import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import SignInForm from '@/app/(auth)/signin/page'
import {redirect} from 'next/navigation'
import { isAdmin } from '@/lib/isAdmin'

const page = async() => {
    const session = await getServerSession(NEXT_AUTH)
    if (!session?.user?.email) {
        return (
            <div>
                <SignInForm />
            </div>
        )
    }

    
  return (
    <>
        <div className=" mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage users, view analytics, and configure settings.</p>
        </div>
    </>
  )
}

export default page