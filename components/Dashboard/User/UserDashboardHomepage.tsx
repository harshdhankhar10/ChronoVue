'use client'
import React from 'react'
import Link from 'next/link'

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
  weeklyProgress: Array<{
    week: string
    completed: number
    created: number
  }>
}

interface UserDashboardProps {
  data: DashboardData
}

const UserDashboard = ({ data }: UserDashboardProps) => {
  const completionRate = data.stats.totalMilestones > 0 
    ? Math.round((data.stats.completedMilestones / data.stats.totalMilestones) * 100)
    : 0

  const totalSpent = data.recentTransactions
    .filter(t => t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0)


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {data.user.fullName || data.user.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            Member since {new Date(data.user.createdAt).toLocaleDateString()} • {data.user.credits} credits available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Timelines</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.totalTimelines}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <Link href="/dashboard/user/timelines" className="text-orange-600 text-sm font-medium mt-4 block">
              View all →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Milestones</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.totalMilestones}</p>
                <p className="text-sm text-green-600">{completionRate}% completed</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <Link href="/dashboard/user/timelines" className="text-orange-600 text-sm font-medium mt-4 block">
              View progress →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Community</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.communitySpaces}</p>
                <p className="text-sm text-blue-600">{data.stats.communityPosts} posts</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <Link href="/dashboard/user/community" className="text-orange-600 text-sm font-medium mt-4 block">
              Explore →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Credits</p>
                <p className="text-2xl font-bold text-gray-900">{data.user.credits}</p>
                <p className="text-sm text-gray-600 text-primary font-semibold">₹{totalSpent} spent</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <Link href="/dashboard/user/settings/credits" className="text-orange-600 text-sm font-medium mt-4 block">
              Buy more →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Recent Timelines</h2>
                <Link href="/dashboard/user/timelines" className="text-orange-600 text-sm font-medium">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.recentTimelines.map((timeline) => (
                  <div key={timeline.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{timeline.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{timeline.category.toLowerCase()} • {timeline.milestoneCount} milestones</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{timeline.progress}%</div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${timeline.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                <Link href="/dashboard/user/settings/transactions-history" className="text-orange-600 text-sm font-medium">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">{transaction.type.toLowerCase()}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`text-lg font-bold ${
                      transaction.type !== 'BUY_CREDIT' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Rs.{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
                <Link href="/dashboard/user/ai-insights" className="text-orange-600 text-sm font-medium">
                  View all →
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {data.aiInsights.map((insight) => (
                  <div key={insight.id} className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 capitalize">{insight.type.toLowerCase().replace('_', ' ')}</span>
                      <span className="text-green-600 font-medium">{insight.confidence}% confidence</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(insight.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  )
}

export default UserDashboard