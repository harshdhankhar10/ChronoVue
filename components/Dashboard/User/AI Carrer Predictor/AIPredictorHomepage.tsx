"use client"

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import {
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer
} from 'recharts';
import { Sparkles } from 'lucide-react';
import AIModalForCareer from './AIModalForCareer';


interface CareerPrediction {
  id: string;
  currentTimeline: number;
  optimizedTimeline: number;
  confidenceScore: number;
  jobReadyDate: Date | null;
  timelineComparison: any;
  daysSaved: any;
  paceAnalysis: any;
  skillsRadarData: any;
  skillProgression: any;
  riskAssessment: any;
  successProbability: any;
  careerPathScenarios: any[];
  salaryProjections: any[];
  companyTargets: any[];
  roleMatches: any[];
  skillGaps: any[];
  whatToDos: any[];
  whatNotToDos: any[];
  successFactors: any[];
  actionPlan: any;
  marketInsights: any;
  motivationAnalysis: any;
  interviewReadiness: any;
  resourcesRecommendations: any;
  learningPatterns: any;
  predictionVersion: string;
  createdAt: Date;
}

interface AIPredictorHomepageProps {
  prediction: CareerPrediction;
}




const AIPredictorHomepage: React.FC<AIPredictorHomepageProps> = ({ prediction }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const skillRadarData = prediction.skillsRadarData?.radarChart?.labels?.map((label: string, index: number) => ({
    subject: label,
    current: prediction.skillsRadarData.radarChart.currentLevels[index],
    target: prediction.skillsRadarData.radarChart.targetLevels[index],
    fullMark: 100,
  })) || [];

  const skillProgressData = prediction.skillsRadarData?.progressBars || [];
  const monthlyProgression = prediction.skillProgression?.monthlyProjection || [];
  const roleMatchData = prediction.roleMatches || [];
  const marketSkillData = prediction.marketInsights?.skillDemand || [];
  const successFactorsData = prediction.successFactors || [];
  const highRisks = prediction.riskAssessment?.highRisks || [];
  const mediumRisks = prediction.riskAssessment?.mediumRisks || [];
  const salaryProjections = prediction.salaryProjections || [];
  const companyTargets = prediction.companyTargets || [];
  const timelineComparison = prediction.timelineComparison || {};
  const paceAnalysis = prediction.paceAnalysis || {};
  const motivationAnalysis = prediction.motivationAnalysis || {};
  const interviewReadiness = prediction.interviewReadiness || {};
  const resourcesRecommendations = prediction.resourcesRecommendations || {};
  const learningPatterns = prediction.learningPatterns || {};

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];


  const StatCard = ({ title, value, subtitle, color }: { title: string; value: string; subtitle: string; color: string }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="text-gray-600 text-sm font-medium mb-2">{title}</div>
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-gray-500 text-sm">{subtitle}</div>
    </div>
  );

  const ProgressBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
    <div className="w-full bg-gray-100 rounded-full h-3">
      <div 
        className={`h-3 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  const TabButton = ({ tab, label, icon }: { tab: string; label: string; icon: string }) => (
    <Button 
      variant={"outline"} 
      onClick={() => setActiveTab(tab)} 
      className={activeTab === tab ? 'bg-gray-200' : ''}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Button>
  );





  return (
    <>
      <div className="min-h-screen bg-gray-50" >
      <div className="mx-auto px-2">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Career Navigator</h1>
            <p className="text-gray-600 mt-2">AI-powered career path analysis</p>
          </div>
          <Button onClick={() => setIsAIModalOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Ask AI 
          </Button>
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Success Probability" 
            value={`${Math.round(prediction.confidenceScore * 100)}%`} 
            subtitle="Based on your profile"
            color="text-green-600"
          />
          <StatCard 
            title="Optimized Timeline" 
            value={`${prediction.optimizedTimeline} months`} 
            subtitle="From current 5.5 months"
            color="text-blue-600"
          />
          <StatCard 
            title="Time Saved" 
            value={`${prediction.daysSaved?.totalDays} days`} 
            subtitle="With optimized path"
            color="text-purple-600"
          />
          <StatCard 
            title="Job Ready" 
            value={prediction.jobReadyDate ? prediction.jobReadyDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'} 
            subtitle="Expected date"
            color="text-orange-600"
          />
        </div>

        <div className="flex justify-between items-center mb-6 border-b pb-4">
         <div className="flex justify-center items-center gap-2 flex-wrap">
           <TabButton tab="overview" label="Overview" icon="📊" />
           <TabButton tab="timeline" label="Timeline" icon="⏱️" />
           <TabButton tab="skills" label="Skills" icon="🎯" />
           <TabButton tab="career" label="Career Paths" icon="🚀" />
           <TabButton tab="salary" label="Salary" icon="💰" />
           <TabButton tab="companies" label="Companies" icon="🏢" />
           <TabButton tab="risks" label="Risks" icon="⚠️" />
           <TabButton tab="action" label="Action Plan" icon="📝" />
           <TabButton tab="resources" label="Resources" icon="📚" />
           <TabButton tab="learning" label="Learning" icon="🧠" />
         </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Role Compatibility</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roleMatchData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="role" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="match" name="Match %" radius={[4, 4, 0, 0]}>
                      {roleMatchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Radar Analysis</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillRadarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" fontSize={12} />
                    <Radar name="Current" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Radar name="Target" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Factors</h2>
              <div className="space-y-4">
                {successFactorsData.map((factor: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">{factor.factor}</span>
                        <span className="text-sm font-medium text-gray-600">{factor.score}/10</span>
                      </div>
                      <ProgressBar 
                        value={factor.score} 
                        max={10} 
                        color={factor.score >= 8 ? 'bg-green-500' : factor.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'} 
                      />
                      <p className="text-gray-600 text-sm mt-2">{factor.description}</p>
                      <p className="text-blue-600 text-sm mt-1">{factor.improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Demand</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketSkillData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ skill, demand }) => `${skill}: ${demand}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="demand"
                    >
                      {marketSkillData.map((entry:any, index:any) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 gap-6" >  
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-red-200 bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Current Path</h3>
                  <div className="space-y-3">
                    {timelineComparison.currentPath?.map((step: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-red-800">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Optimized Path</h3>
                  <div className="space-y-3">
                    {timelineComparison.optimizedPath?.map((step: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-green-800">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-3">Key Optimizations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {timelineComparison.keyOptimizations?.map((opt: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-700 text-sm">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Days Saved Breakdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(prediction.daysSaved?.breakdown || {}).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{value as number}</div>
                    <div className="text-gray-600 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pace Analysis</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{paceAnalysis.consistencyScore}%</div>
                  <div className="text-gray-600 text-sm">Consistency</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{paceAnalysis.learningVelocity}</div>
                  <div className="text-gray-600 text-sm">Learning Velocity</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">{paceAnalysis.weeklyProgressRate}%</div>
                  <div className="text-gray-600 text-sm">Progress Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{paceAnalysis.optimalWeeklyTarget}%</div>
                  <div className="text-gray-600 text-sm">Optimal Target</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Improvement Areas</h4>
                <div className="space-y-2">
                  {paceAnalysis.improvementAreas?.map((area: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-800">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Progression</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProgression}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="frontend" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
                    <Line type="monotone" dataKey="backend" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
                    <Line type="monotone" dataKey="devops" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B' }} />
                    <Line type="monotone" dataKey="softSkills" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Matrix</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(prediction.skillsRadarData?.skillMatrix || {}).map(([skill, data]: [string, any]) => (
                  <div key={skill} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900 capitalize">{skill}</div>
                    <div className="text-2xl font-bold text-blue-600 mt-2">{data.current}%</div>
                    <div className="text-gray-500 text-sm">Target: {data.target}%</div>
                    <ProgressBar 
                      value={data.current} 
                      max={data.target} 
                      color="bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Gap Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prediction.skillGaps?.map((skill: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 bg-white">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-gray-900">{skill.skill}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        skill.priority === 'Very High' ? 'bg-red-100 text-red-800' :
                        skill.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {skill.priority}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Current: {skill.currentLevel}%</span>
                        <span>Target: {skill.targetLevel}%</span>
                      </div>
                      <ProgressBar 
                        value={skill.currentLevel} 
                        max={skill.targetLevel} 
                        color="bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{skill.impact}</p>
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Resources:</div>
                      <div className="space-y-1">
                        {skill.resources?.map((resource: string, resIndex: number) => (
                          <div key={resIndex} className="text-sm text-blue-600">• {resource}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'career' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Path Scenarios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prediction.careerPathScenarios?.map((path: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-xl text-gray-900">{path.path}</h3>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {path.probability}% Match
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <div className="text-gray-600 font-medium">Salary Range</div>
                        <div className="font-bold text-lg">₹{path.salary?.min}-{path.salary?.max}L</div>
                      </div>
                      <div>
                        <div className="text-gray-600 font-medium">Timeline</div>
                        <div className="font-bold text-lg">{path.timeline} months</div>
                      </div>
                      <div>
                        <div className="text-gray-600 font-medium">Growth</div>
                        <div className="font-semibold text-green-600">{path.growth}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 font-medium">Lifestyle</div>
                        <div className="font-semibold">{path.lifestyle}</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-600 font-medium mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {path.skills?.map((skill: string, skillIndex: number) => (
                          <span key={skillIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What To Do & What Not To Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-4">✅ What To Do</h3>
                  <div className="space-y-3">
                    {prediction.whatToDos?.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-green-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-700 mb-4">❌ What Not To Do</h3>
                  <div className="space-y-3">
                    {prediction.whatNotToDos?.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span className="text-red-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Salary Projections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {salaryProjections.map((projection: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{projection.role}</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600">Current</div>
                          <div className="text-lg font-bold text-blue-700">₹{projection.current.avg}L</div>
                          <div className="text-xs text-gray-500">₹{projection.current.min}-{projection.current.max}L</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-600">After Optimization</div>
                          <div className="text-lg font-bold text-green-700">₹{projection.afterOptimization.avg}L</div>
                          <div className="text-xs text-gray-500">₹{projection.afterOptimization.min}-{projection.afterOptimization.max}L</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm text-gray-600">6 Months Exp</div>
                          <div className="text-lg font-bold text-purple-700">₹{projection.sixMonthsExperience.avg}L</div>
                          <div className="text-xs text-gray-500">₹{projection.sixMonthsExperience.min}-{projection.sixMonthsExperience.max}L</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Targets</h2>
              <div className="space-y-6">
                {companyTargets.map((target: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{target.tier}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Timeline: {target.timeline}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          target.readiness >= 80 ? 'bg-green-100 text-green-800' :
                          target.readiness >= 65 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {target.readiness}% Readiness
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Companies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {target.companies?.map((company: string, companyIndex: number) => (
                          <span key={companyIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Preparation Required:</h4>
                      <div className="space-y-2">
                        {target.preparation?.map((prep: string, prepIndex: number) => (
                          <div key={prepIndex} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-gray-700">{prep}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-4">High Priority Risks</h3>
              <div className="space-y-4">
                {highRisks.map((risk: any, index: number) => (
                  <div key={index} className="bg-white border border-red-200 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-red-800">{risk.risk}</h4>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {risk.probability}%
                      </span>
                    </div>
                    <p className="text-red-700 text-sm mb-3">{risk.impact}</p>
                    <div className="text-sm text-gray-600 mb-2">Timeline: {risk.timeline}</div>
                    <div className="text-red-600 text-sm font-medium">Mitigation: {risk.mitigation}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow-700 mb-4">Medium Priority Risks</h3>
              <div className="space-y-4">
                {mediumRisks.map((risk: any, index: number) => (
                  <div key={index} className="bg-white border border-yellow-200 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-yellow-800">{risk.risk}</h4>
                      <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {risk.probability}%
                      </span>
                    </div>
                    <p className="text-yellow-700 text-sm mt-3">{risk.impact}</p>
                    <div className="text-sm text-gray-600 mt-2">Timeline: {risk.timeline}</div>
                    <div className="text-yellow-600 text-sm font-medium mt-2">Mitigation: {risk.mitigation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'action' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">High Priority Actions</h2>
              <div className="space-y-4">
                {prediction.actionPlan?.highPriority?.map((action: any, index: number) => (
                  <div key={index} className="border border-red-200 bg-red-50 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-gray-900">{action.task}</h4>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        High Priority
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3 text-sm">{action.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Timeline: {action.timeline}</span>
                      <span>Effort: {action.effort}</span>
                      <span>Impact: {action.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Medium Priority Actions</h2>
              <div className="space-y-4">
                {prediction.actionPlan?.mediumPriority?.map((action: any, index: number) => (
                  <div key={index} className="border border-yellow-200 bg-yellow-50 rounded-xl p-5">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-900">{action.task}</h4>
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Medium Priority
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2 text-sm">{action.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                      <span>Timeline: {action.timeline}</span>
                      <span>Effort: {action.effort}</span>
                      <span>Impact: {action.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-4">📚 Books</h3>
                  <div className="space-y-3">
                    {resourcesRecommendations.books?.map((book: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-blue-800">{book}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-4">🎓 Courses</h3>
                  <div className="space-y-3">
                    {resourcesRecommendations.courses?.map((course: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-green-800">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-700 mb-4">💻 Practice Platforms</h3>
                  <div className="space-y-3">
                    {resourcesRecommendations.practice?.map((platform: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <span className="text-orange-800">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">🚀 Project Ideas</h3>
                  <div className="space-y-3">
                    {resourcesRecommendations.projects?.map((project: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <span className="text-purple-800">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Patterns & Motivation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Effectiveness</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="text-sm text-gray-600">Best Learning Time</div>
                      <div className="text-lg font-bold text-blue-700">{learningPatterns.bestTime}</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="text-sm text-gray-600">Preferred Method</div>
                      <div className="text-lg font-bold text-green-700">{learningPatterns.preferredMethod}</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <div className="text-sm text-gray-600">Weekly Consistency</div>
                      <div className="text-lg font-bold text-purple-700">{learningPatterns.weeklyConsistency}%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Retention Rates</h3>
                  <div className="space-y-3">
                    {Object.entries(learningPatterns.retentionRate || {}).map(([method, rate]: [string, any]) => (
                      <div key={method} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium capitalize">{method}</span>
                        <span className="text-lg font-bold text-blue-600">{rate}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Motivation Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className={`p-4 rounded-xl ${
                    motivationAnalysis.burnoutRisk === 'Low' ? 'bg-green-50' :
                    motivationAnalysis.burnoutRisk === 'Medium' ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <div className="text-sm text-gray-600">Burnout Risk</div>
                    <div className={`text-lg font-bold ${
                      motivationAnalysis.burnoutRisk === 'Low' ? 'text-green-700' :
                      motivationAnalysis.burnoutRisk === 'Medium' ? 'text-yellow-700' : 'text-red-700'
                    }`}>
                      {motivationAnalysis.burnoutRisk}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <div className="text-sm text-gray-600">Peak Productivity</div>
                    <div className="text-lg font-bold text-blue-700">{motivationAnalysis.peakProductivity}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Consistency Patterns</h4>
                  <div className="space-y-2">
                    {motivationAnalysis.consistencyPatterns?.map((pattern: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="text-gray-700">{pattern}</span>
                      </div>
                    ))}
                  </div>
                  <h4 className="font-semibold text-gray-700 mt-4 mb-3">Recommendations</h4>
                  <div className="space-y-2">
                    {motivationAnalysis.recommendations?.map((rec: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Readiness</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Skills</h3>
                  <div className="space-y-4">
                    {Object.entries(interviewReadiness.technical || {}).map(([skill, data]: [string, any]) => (
                      <div key={skill} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900 capitalize">{skill}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            data.priority === 'Very High' ? 'bg-red-100 text-red-800' :
                            data.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {data.priority}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-blue-600">{data.score}%</span>
                          <span className={`text-sm font-medium ${
                            data.status === 'Critical Gap' ? 'text-red-600' :
                            data.status === 'Needs Improvement' ? 'text-orange-600' :
                            data.status === 'Developing' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {data.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Behavioral Skills</h3>
                  <div className="space-y-4">
                    {Object.entries(interviewReadiness.behavioral || {}).map(([skill, data]: [string, any]) => (
                      <div key={skill} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900 capitalize">{skill}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            data.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {data.priority}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-blue-600">{data.score}%</span>
                          <span className={`text-sm font-medium ${
                            data.status === 'Good' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {data.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>

    {isAIModalOpen && (
      <AIModalForCareer
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        prediction ={prediction}
      />
    )}
    </>
  );
};

export default AIPredictorHomepage;