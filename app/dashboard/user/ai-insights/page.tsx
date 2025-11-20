// app/ai-insights/page.tsx
import AI_InsightsHomepage from '@/components/Dashboard/AI Insights/AI_InsightsHomepage'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

const page = async () => {
  const user = await currentLoggedInUserInfo()
  if (!user) {
    redirect('/signin')
  }
  
  const userInfo = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      Timeline: true,
      MileStone: true,
      Journal: true,
      ownedSpaces: true,
      Profile: true,
      Onboarding: true,
    }
  })

  const communitySpaces = await prisma.communitySpace.findMany({
    where: {
      members: {
        some: {
          userId: user.id
        }
      }
    }
  })

  const aiInsights = await prisma.aIInsight.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const lastInsight = aiInsights[0]
  const lastGenerationDate = lastInsight ? lastInsight.createdAt : null
  const nextGenerationDate = new Date()
  if (lastGenerationDate) {
    nextGenerationDate.setDate(lastGenerationDate.getDate() + 7)
  }
  const daysUntilNext = Math.ceil((nextGenerationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  return (
    <AI_InsightsHomepage 
      userInfo={userInfo}
      aiInsights={aiInsights}
      communitySpaces={communitySpaces}
      lastInsight={lastInsight}
      daysUntilNext={daysUntilNext}
    />
  )
}

export default page