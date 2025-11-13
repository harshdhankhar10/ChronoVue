"use client"
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/formatDate'
 

const TransactionHistory = ({ transactions, currentPage, totalPages }: any) => {
    const router = useRouter()

    const handlePageChange = (page: number) => {
        router.push(`/dashboard/user/settings/transaction-history?page=${page}`)
    }

    const totalAmountPaid = transactions.reduce((acc: number, transaction: any) => acc + transaction.amount, 0);

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



    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
                    <p className="text-gray-600 mt-2">View all your payment transactions</p>
                </div>

                <div className="bg-white rounded-sm border mb-8">
                    <Table className="border">
                        <TableCaption>Total Amount Paid : ₹{totalAmountPaid}</TableCaption>
                        <TableHeader>
                            <TableRow className="[&>th]:border-r last:border-r-0">
                                <TableHead className="w-[100px]">S/N</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Where Paid</TableHead>
                                <TableHead>Paid Via</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Paid On</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction: any, idx: number) => (
                                <TableRow key={transaction.id} className="[&>td]:border-r last:border-r-0">
                                    <TableCell className="font-medium">{idx + 1}</TableCell>
                                    <TableCell>{getStatusIcon(transaction.status)}</TableCell>
                                    <TableCell>{(transaction.additionalInfo)}</TableCell>
                                    <TableCell>{transaction.paymentMethod}</TableCell>
                                    <TableCell className="text-right">₹{transaction.amount}</TableCell>
                                    <TableCell className="text-right">
                                        {formatDate(transaction.createdAt)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    <TableFooter>
                        <TableRow className="*:border-r last:border-r-0">
                            <TableCell colSpan={6}>
                                <div className="w-full flex justify-between items-center">
                                    <Button
                                        variant={"outline"}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage <= 1}
                                    >
                                        Prev
                                    </Button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                    <Button
                                        variant={"outline"}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory
