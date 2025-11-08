import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

const TransactionHistory = async () => {
    const session = await getServerSession(NEXT_AUTH)
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        }
    })
    const transactions = await prisma.paymentTransaction.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return <CheckCircle className="h-5 w-5 text-green-600" />
            case 'PENDING':
                return <Clock className="h-5 w-5 text-yellow-600" />
            case 'FAILED':
                return <XCircle className="h-5 w-5 text-red-600" />
            default:
                return <Clock className="h-5 w-5 text-gray-600" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-100 text-green-800'
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800'
            case 'FAILED':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className=" mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
                    <p className="text-gray-600 mt-2">View all your payment transactions</p>
                </div>

                <div className="bg-white rounded-sm border">
                    {transactions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">💳</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                            <p className="text-gray-600">You haven't made any transactions yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="p-6 ">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {getStatusIcon(transaction.status)}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {transaction.additionalInfo}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {new Date(transaction.createdAt).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1 font-semibold">
                                                    Payment ID: {transaction.id}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className="flex flex-col items-end space-y-1">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                    {transaction.status}
                                                </span>
                                                    <p className="text-lg font-semibold text-gray-900">
                                                        ₹{transaction.amount}
                                                    </p>
                                                    <p className="text-sm text-gray-600 capitalize font-semibold text-primary">
                                                        {transaction.type.toLowerCase().replace("_", " ")}
                                                    </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory