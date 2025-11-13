import prisma from '@/lib/prisma'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo' 
import { redirect } from 'next/navigation'
import TransactionHistory from './TransactionHistory'

const page = async ({ searchParams }: any) => {
    const { page } = searchParams || 1
    const user = await currentLoggedInUserInfo()
    if (!user) {
        return redirect('/signin')
    }
    if (!page || isNaN(parseInt(page)) || parseInt(page) < 1) {
        return redirect('/dashboard/user/settings/transactions-history?page=1')
    }

        const transactions = await prisma.paymentTransaction.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: (parseInt(page) - 1) * 10,
        take: 10
    })


    const totalTransactions = await prisma.paymentTransaction.count({
        where: {
            userId: user.id
        }
    })

    if (transactions.length === 0 ) {
        return (
            <div className=" flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">No Transactions Found</h1>
                    <p className="text-gray-600">You have not made any transactions yet.</p>
                </div>
            </div>
        )
    }

    

    return (
        <TransactionHistory
            transactions={transactions}
            currentPage={parseInt(page)}
            totalPages={Math.ceil(totalTransactions / 10)}
        />
    )
}

export default page
