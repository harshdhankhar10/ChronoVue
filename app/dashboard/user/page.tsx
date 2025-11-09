import UserDashboardHomepage from '@/components/Dashboard/User/UserDashboardHomepage'
import { currentLoggedInUserInfo } from '@/lib/currentLoggedInUserInfo'
import prisma from '@/lib/prisma'

interface DashboardData {
  user: {
    id: string
    fullName: string | null
    username: string
    email: string
    credits: number
    profilePicture: string
    createdAt: Date
  }
  stats: {
    totalTimelines: number
    totalMilestones: number
    completedMilestones: number
    pendingMilestones: number
    journalEntries: number
    communityPosts: number
    communitySpaces: number
    mentorSessions: number
  }
  recentTimelines: Array<{
    id: string
    name: string
    category: string
    progress: number
    milestoneCount: number
  }>
  recentTransactions: Array<{
    id: string
    amount: number
    type: string
    status: string
    createdAt: Date
  }>
  aiInsights: Array<{
    id: string
    title: string
    type: string
    confidence: number
    createdAt: Date
  }>
}

const page = async () => {
  const user = await currentLoggedInUserInfo()
  if (!user) return null

  const timelines = await prisma.timeline.findMany({
    where: { userId: user.id },
    include: { milestones: true }
  })

  const milestones = await prisma.mileStone.findMany({
    where: { userId: user.id }
  })

  const journals = await prisma.journal.count({ where: { userId: user.id } })
  const posts = await prisma.createPost.count({ where: { authorId: user.id } })
  
  const communitySpaces = await prisma.communityMember.count({
    where: { userId: user.id, status: 'ACTIVE' }
  })

  const mentorSessions = await prisma.mentorSession.count({
    where: { OR: [{ studentId: user.id }, { mentorUserId: user.id }] }
  })

  const transactions = await prisma.paymentTransaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  const aiInsights = await prisma.aIInsight.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 3
  })

  const completedMilestones = milestones.filter(m => m.status === 'COMPLETED').length
  const pendingMilestones = milestones.filter(m => m.status === 'IN_PROGRESS').length

  const recentTimelines = timelines.slice(0, 3).map(timeline => ({
    id: timeline.id,
    name: timeline.name,
    category: timeline.category,
    progress: timeline.milestones.length > 0 
      ? Math.round((timeline.milestones.filter(m => m.status === 'COMPLETED').length / timeline.milestones.length) * 100)
      : 0,
    milestoneCount: timeline.milestones.length
  }))


  const dashboardData: DashboardData = {
    user: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      credits: user.credits,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt
    },
    stats: {
      totalTimelines: timelines.length,
      totalMilestones: milestones.length,
      completedMilestones,
      pendingMilestones,
      journalEntries: journals,
      communityPosts: posts,
      communitySpaces,
      mentorSessions
    },
    recentTimelines,
    recentTransactions: transactions,
    aiInsights: aiInsights.map(insight => ({
      id: insight.id,
      title: insight.title,
      type: insight.type,
      confidence: insight.confidence,
      createdAt: insight.createdAt
    })),
  }

  return <UserDashboardHomepage data={dashboardData} />
}

export default page