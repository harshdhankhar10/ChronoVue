"use client"
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';

const CreditsUsage = ({ credits, currentPage, totalPages }: any) => {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    router.push(`/dashboard/user/settings/credits-usage?page=${page}`)
  }

  const totalCreditsUsed = credits.reduce((acc: number, credit: any) => acc + credit.creditsUsed, 0);

  if (credits.length === 0) {
    return <p className="text-center mt-10">No credit usage found.</p>
  }


  return (
    <div>
        <div>
        <h1 className="text-2xl font-bold mb-1">Credits Usage</h1>
        <p className="mb-6 text-muted-foreground">Track your credits usage history below.</p>
        </div>
      <Table className="border">
        <TableCaption>Total Credits Used : {totalCreditsUsed}</TableCaption>
        <TableHeader>
          <TableRow className="[&>th]:border-r last:border-r-0">
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>Type </TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Credits Used</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credits.map((credit: any, idx: number) => (
            <TableRow key={credit.id} className="[&>td]:border-r last:border-r-0">
              <TableCell className="font-medium">{idx+1}</TableCell>
              <TableCell>{credit.type.split('_').join(' ')}</TableCell>
              <TableCell>{credit.description}</TableCell>
              <TableCell className="text-right">{credit.creditsUsed}</TableCell>
              <TableCell className="text-right">{formatDate(credit.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="*:border-r last:border-r-0">
            <TableCell colSpan={4}>
              <div className="flex justify-between items-center">
                <Button variant={"outline"}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Prev
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button variant={"outline"}
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
  )
}

export default CreditsUsage
