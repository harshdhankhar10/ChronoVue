import Onboarding from '@/components/Dashboard/User/AI Carrer Predictor/Onboarding'
import React from 'react'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import prisma  from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import AIPredictorHomepage from '@/components/Dashboard/User/AI Carrer Predictor/AIPredictorHomepage'
import Link from 'next/link'
import { redirect } from 'next/navigation'


const page = async ({searchParams}:any) => {
  const {id} = searchParams
  const user = await currentLoggedInUserInfo()
  if(!user){
    return <div>Please log in to access the Career Predictor.</div>
  }

  const isOnboarded = await prisma.aICareerPredictor.findFirst({
    where:{
      userId: user?.id
    }
  })
  if(!user){
    return <div>Please log in to access the Career Predictor.</div>
  }

  const allPredictions = await prisma.aICareerPredictor.findMany({
    where:{
      userId: user?.id
    }
  })


  if(isOnboarded === null || !isOnboarded.isOnboarded){
    return (
       <Onboarding credits={user.credits}/>
    )
  }
  if(id){
    let prediction = await prisma.aICareerPredictor.findFirst({
      where:{
        id: id,
      }
    })
    console.log("prediction", prediction)
    if(!prediction){
      return redirect('/dashboard/user/career-predictor')
    } 
    return (
      <AIPredictorHomepage prediction={prediction!} />
    )
  }
  return (
    <>
<div>
  <h1 className="text-2xl font-bold mb-4">
    View your AI Career Predictions
  </h1>
  {allPredictions.map((prediction) => {
    return (
      <div key={prediction.id} className="border-4 border-primary p-4 rounded mb-4">
        <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
          {prediction.predictionVersion}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Timeline</div>
            <div className="font-semibold">{prediction.currentTimeline} months</div>
            <div className="text-xs text-green-600">Optimized: {prediction.optimizedTimeline} months</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Confidence</div>
            <div className="font-semibold">{Math.round(prediction.confidenceScore * 100)}%</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Job Ready</div>
            <div className="font-semibold">
              {prediction.jobReadyDate ? new Date(prediction.jobReadyDate).toLocaleDateString() : 'Not set'}
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Role Matches</div>
            <div className="font-semibold">{Array.isArray(prediction.roleMatches) ? prediction.roleMatches.length : 0}</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Skill Gaps</div>
            <div className="font-semibold">{Array.isArray(prediction.skillGaps) ? prediction.skillGaps.length : 0}</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Created</div>
            <div className="font-semibold text-sm">{new Date(prediction.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Link href={`/dashboard/user/career-predictor/?id=${prediction.id}`}>
          <Button >
            View Details
          </Button>
          </Link>
          <Button variant="outline" disabled>
            Compare
          </Button>
        </div>
      </div>
    )
  })}
</div>
 
    </>
  )
}

export default page