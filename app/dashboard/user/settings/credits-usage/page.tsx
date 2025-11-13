
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import CreditsUsage from '@/components/Dashboard/Credits Usage/CreditsUsage'
const page = async ({ searchParams }: any) => {
    const { page } = searchParams || 1
    const user = await currentLoggedInUserInfo()
    if (!user) {
        return redirect('/signin')
    }
    if (isNaN(parseInt(page)) || parseInt(page) < 1) {
        return redirect('/dashboard/user/settings/credits-usage?page=1')
    }

    const credits = await prisma.creditUsage.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: (parseInt(page) - 1) * 10,
        take: 10
    })

    const totalCredits = await prisma.creditUsage.count({
        where: {
            userId: user.id
        }
    })

    return (
        <CreditsUsage credits={credits} currentPage={parseInt(page)} totalPages={Math.ceil(totalCredits / 10)} />
    )
}

export default page
