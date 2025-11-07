import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = async () => {
    const session = await getServerSession(NEXT_AUTH)

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        },
    })

    const timelines = await prisma.timeline.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formatDate = (dateString: Date) => {
        let date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }


    return (
        <>
<div>
    <header className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Timelines</h1>
            <p className="text-gray-600 mt-1">Manage your timelines here</p>
        </div>
        <Button >
            Create New Timeline
        </Button>
    </header>

    {timelines.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No timelines found</p>
            <p className="text-gray-400 text-sm mt-1">Start by creating a new timeline</p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelines.map((timeline) => (
                <div key={timeline.id} className="border border-gray-200 rounded-lg p-5 bg-white">
                    <Link href={`/dashboard/user/timelines/${timeline.id}`}>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                            {timeline.name}
                        </h2>
                    </Link>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p>Start: {formatDate(timeline.startDate)}</p>
                        <span className="flex items-center space-x-1">
                            <p>Deadline: {formatDate(timeline.endDate)}</p>
                            <p>
                                {timeline.endDate < new Date() ? (
                                    <span className="text-red-500 font-semibold"> (Deadline Passed)</span>
                                ) : (
                                    <span className="text-green-500 font-semibold"> (Ongoing)</span>
                                )}
                            </p>
                        </span>
                        <p>Category: {timeline.category}</p>
                        <p>Duration: {timeline.duration.replace(/_/g, ' ').toLowerCase()}</p>
                        <p>Public: {timeline.isPublic ? (<span className="text-green-500 font-semibold">Yes</span>) : (<span className="text-red-500 font-semibold">No</span>)}</p>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>        </>
    )
}

export default page