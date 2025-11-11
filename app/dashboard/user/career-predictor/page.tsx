import Onboarding from '@/components/Dashboard/User/AI Carrer Predictor/Onboarding'
import React from 'react'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import prisma  from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import AIPredictorHomepage from '@/components/Dashboard/User/AI Carrer Predictor/AIPredictorHomepage'



const page = async () => {
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


  if(isOnboarded === null || !isOnboarded.isOnboarded){
    return (
       <Onboarding credits={user.credits}/>
    )
  }

  return (
    <>
      <AIPredictorHomepage/>
 
    </>
  )
}

export default page