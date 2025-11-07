import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'

const mood = {
  HAPPY: { label: 'Happy', emoji: '😊', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  SAD: { label: 'Sad', emoji: '😢', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  NEUTRAL: { label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  EXCITED: { label: 'Excited', emoji: '🎉', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  ANXIOUS: { label: 'Anxious', emoji: '😰', color: 'bg-red-100 text-red-800 border-red-200' },
  GRATEFUL: { label: 'Grateful', emoji: '🙏', color: 'bg-green-100 text-green-800 border-green-200' },
  STRESSED: { label: 'Stressed', emoji: '😣', color: 'bg-yellow-200 text-yellow-800 border-yellow-300' },
  MOTIVATED: { label: 'Motivated', emoji: '💪', color: 'bg-blue-200 text-blue-800 border-blue-300' },
  REFLECTIVE: { label: 'Reflective', emoji: '🤔', color: 'bg-purple-100 text-purple-800 border-purple-200' },
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

const Page = async ({ params }: any ) => {
  const session = await getServerSession(NEXT_AUTH)
  const user = session?.user
  const id = params.id


  const journal = await prisma.journal.findFirst({
    where: { id: id, userId: user.id }
  })

  if (!journal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Journal Not Found</h1>
          <p className="text-gray-600 mb-4">The journal you're looking for doesn't exist or you don't have access to it.</p>
          <Link href="/dashboard/user/journal" className="text-secondary hover:text-secondary/90 font-medium">
            Back to Journals
          </Link>
        </div>
      </div>
    )
  }

  const moodInfo = mood[journal.mood]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/dashboard/user/journal"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Journals
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{journal.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Created on {formatDate(journal.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${moodInfo.color}`}>
                <span className="mr-2">{moodInfo.emoji}</span>
                {moodInfo.label}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                {journal.content}
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                {journal.tags && journal.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {journal.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-secondary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No tags added</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page