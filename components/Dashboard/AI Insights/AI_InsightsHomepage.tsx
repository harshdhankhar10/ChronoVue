// components/Dashboard/AI Insights/AI_InsightsHomepage.tsx
'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loader } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

interface UserInfo {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  isMentor: boolean;
  role: string;
  credits: number;
  Timeline: any[];
  MileStone: any[];
  Journal: any[];
  ownedSpaces: any[];
  Profile: any;
  Onboarding: any;
  AIInsights: any[];
}

interface AIInsight {
  id: string;
  title: string;
  type: string;
  period: string;
  createdAt: Date;
  summary: string;
  confidence: number;
  keyFindings?: Array<{
    title: string;
    description: string;
    trend: string;
    metric: string;
  }>;
  skillGaps?: Array<{
    skill: string;
    importance: string;
    estimatedLearningTime: string;
  }>;
  recommendations?: Array<{
    title: string;
    description: string;
    priority: string;
    impact: string;
    effort: string;
    timeline: string;
  }>;
  riskAnalysis?: Array<{
    risk: string;
    severity: string;
    impact: string;
    mitigation: string;
  }>;
}

interface CommunitySpace {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

interface AI_InsightsHomepageProps {
  userInfo: UserInfo;
  aiInsights: AIInsight[];
  communitySpaces: CommunitySpace[];
  lastInsight: AIInsight | null;
  daysUntilNext: number;
}

interface Recommendation {
  title: string;
  description: string;
  priority: string;
  impact: string;
  effort: string;
  timeline: string;
  category: string;
  resources: string[];
  riskAnalysis: any[];
}

const AI_InsightsHomepage = ({ userInfo, aiInsights, communitySpaces, lastInsight, daysUntilNext }: any) => {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGenerateInsights = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/aiInsights', {
        generationMethod: 'USER_ACTION'
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'AI insights generated successfully!',
        });
        router.refresh();
      }
    } catch (error: any) {
      console.error('Error generating insights:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToTimeline = async (recommendation: Recommendation) => {
    setLoading(true);
    try {
      const timeline = {
        name: recommendation.title,
        category: recommendation.category,
        resources: recommendation.resources,
        risks: recommendation.riskAnalysis ? recommendation.riskAnalysis : [],
        priority: recommendation.priority.toUpperCase(),
        status: 'NOT_STARTED',
        endDate: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
        duration: 'ONE_YEAR',
        startDate: new Date(),

      }
      const response = await axios.post('/api/dashboard/timelines/create', {
        timeline,
        milestones: [],
        action: "FROM_GLOBAL_AI_INSIGHTS"

      })
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
        router.push('/dashboard/user/timelines');
      }
    } catch (error: any) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">User not found</div>
        </div>
      </div>
    );
  }

  if (userInfo.Timeline.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-2xl font-bold text-gray-900 mb-4">No Timelines Found</div>
          <p className="text-gray-600 mb-6">Create at least 1 timeline to generate AI insights</p>
          <Button onClick={() => router.push('/dashboard/user/timelines/create')}>
            Create Timeline
          </Button>
        </div>
      </div>
    );
  }

  if (userInfo.MileStone.length < 3) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-2xl font-bold text-gray-900 mb-4">More Milestones Needed</div>
          <p className="text-gray-600 mb-6">Add at least 3 milestones to generate AI insights</p>
          <Button onClick={() => router.push('/dashboard/user/milestones/create')}>
            Add Milestones
          </Button>
        </div>
      </div>
    );
  }

  if (userInfo.Journal.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-2xl font-bold text-gray-900 mb-4">Journal Entries Needed</div>
          <p className="text-gray-600 mb-6">Write at least 2 journal entries to generate AI insights</p>
          <Button onClick={() => router.push('/dashboard/user/journal/new')}>
            Write Journal
          </Button>
        </div>
      </div>
    );
  }



  if (aiInsights.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-2xl font-bold text-gray-900 mb-4">Generate Your First AI Insight</div>
          <p className="text-gray-600 mb-6">Get personalized analysis of your progress and recommendations</p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-orange-800 text-sm">
              Don't worry! Your AI insights will be automatically generated by our system every Monday at 12:00 AM UTC.
            </p>
            <p className="text-orange-700 text-sm mt-2">
              Till then, focus on completing your milestones and journaling your progress.
            </p>
          </div>
          <Button onClick={handleGenerateInsights} disabled={loading}>
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Generate Insights Now'}
          </Button>
        </div>
      </div>
    );
  }

  const currentInsight = aiInsights[currentInsightIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Insights Hub</h1>
            <p className="text-gray-600 mt-2">
              Personalized intelligence for your journey
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {daysUntilNext < 0 ? (
                    <Button onClick={handleGenerateInsights} disabled={loading}>
                      {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Generate New Insights'}
                    </Button>
                  ) : (
                    <Button disabled>
                      Generate New in {daysUntilNext} days
                    </Button>
                  )}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {aiInsights.length > 1 && (
        <div className="flex gap-2 mb-6">
          {aiInsights.map((insight: AIInsight, index: number) => (
            <button
              key={insight.id}
              onClick={() => setCurrentInsightIndex(index)}
              className={`px-4 py-2 rounded-lg font-medium ${currentInsightIndex === index
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
                }`}
            >
              {formatDate(insight.createdAt)}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{currentInsight.title}</h2>
              {currentInsightIndex === 0 && (
                <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                  Latest
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">{currentInsight.summary}</p>

            <div className="flex items-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Generated:</span>
                <span className="font-medium">{formatDate(currentInsight.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Confidence:</span>
                <span className="font-medium text-green-600">{currentInsight.confidence}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium capitalize">{currentInsight.type.toLowerCase().replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {currentInsight.keyFindings && currentInsight.keyFindings.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Findings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentInsight.keyFindings.map((finding: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{finding.title}</h4>
                      <span className={`text-sm font-bold px-2 py-1 rounded ${finding.trend === 'positive' ? 'bg-green-100 text-green-800' :
                          finding.trend === 'negative' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                        {finding.metric}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{finding.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentInsight.riskAnalysis && currentInsight.riskAnalysis.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
              <div className="space-y-3">
                {currentInsight.riskAnalysis.map((risk: any, index: number) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-red-900">{risk.risk}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${risk.severity === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                        {risk.severity} risk
                      </span>
                    </div>
                    <p className="text-xs text-red-700 mb-2">{risk.impact}</p>
                    <p className="text-xs text-green-700 font-medium">Mitigation: {risk.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentInsight.skillGaps && currentInsight.skillGaps.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Gap Analysis</h3>
              <div className="space-y-3">
                {currentInsight.skillGaps.map((skill: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <div className="font-medium text-red-900">{skill.skill}</div>
                      <div className="text-sm text-red-700">{skill.estimatedLearningTime}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${skill.importance === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                      {skill.importance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Next Insight Generation</h3>
            <p className="text-sm text-orange-100 mb-4">
              Every Monday at 12:00 AM UTC
            </p>
            <div className="w-full bg-orange-400 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, ((7 - daysUntilNext) / 7) * 100)}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-orange-200 mt-2">
              {daysUntilNext > 0 ? `Next insights will be generated in ${daysUntilNext} day${daysUntilNext !== 1 ? 's' : ''}.` : 'New insights can be generated now!'}
              </p>
          </div>
        </div>


        <div className="space-y-6">
          {currentInsight.recommendations && currentInsight.recommendations.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Action Plan</h3>
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {currentInsight.recommendations.length} recommendations
                </span>
              </div>
              <div className="space-y-4">
                {currentInsight.recommendations.map((rec: any, index: number) => (
                  <div key={index} className={`border-l-4 ${rec.priority === 'HIGH' ? 'border-red-500' :
                      rec.priority === 'MEDIUM' ? 'border-orange-500' : 'border-blue-500'
                    } pl-4 py-3 bg-gray-50 rounded-r-lg`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{rec.title}
                            <Button variant={'link'} onClick={() => handleAddToTimeline(rec)} disabled={loading}>
                              {loading ? <span className='flex items-center gap-2'>
                                Adding
                                <Loader className="w-4 h-4 animate-spin" />
                              </span> : 'Add to Timeline'}
                            </Button>
                          </h4>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${rec.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                              rec.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        Impact: {rec.impact}
                      </span>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {rec.effort} effort
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {rec.timeline}
                      </span>
                    </div>


                  </div>
                ))}
              </div>
            </div>
          )}




        </div>
      </div>
    </div>
  );
};

export default AI_InsightsHomepage;