import MarketSkillsHomepage from '@/components/Dashboard/User/Market Skills Analysis/MarketSkillsHomepage'
import React from 'react'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import prisma from '@/lib/prisma'
import { BarChart, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ViewSpecificAnalysis from '@/components/Dashboard/User/Market Skills Analysis/ViewSpecificAnalysis'
const page = async ({searchParams}:any) => {
    const {analysisId} = searchParams
    const user = await currentLoggedInUserInfo()
    if (!user) {
        return null
    }
    let analysis = await prisma.marketSkillsAnalysis.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {createdAt: 'desc'}
    })
    if(analysisId){
      const specificAnalysis = await prisma.marketSkillsAnalysis.findUnique({
        where: {
          id: analysisId
        }
      })
      if(!specificAnalysis){
        return <div className='text-center text-red-600 font-semibold'>Analysis not found</div>
      }
      return <ViewSpecificAnalysis analysis = {specificAnalysis} />
    }
  
  return (
    <>
    <MarketSkillsHomepage analysis={analysis} />
       
    </>
  )
}

export default page