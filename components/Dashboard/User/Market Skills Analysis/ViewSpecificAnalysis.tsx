"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, LineChart, Line } from 'recharts'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ViewSpecificAnalysis = ({ analysis }: any) => {

  const {
    userSkills,
    skillDemandData,
    salaryImpactData,
    skillGapValue,
    learningROI,
    personalizedInsights,
    recommendationEngine,
    comparisonData,
    projectionData,
    chartData,
    heatmapData,
    trendAnalysis,
    geographyData,
    optimalCombinations,
    opportunityCost,
    successPatterns,
    riskAssessment
  } = analysis

  const skillValueData = chartData?.skillValueChart?.labels.map((label: string, index: number) => ({
    skill: label,
    yourLevel: chartData.skillValueChart.values[index],
    marketDemand: chartData.skillValueChart.marketDemand[index]
  }))

  const salaryImpactChartData = chartData?.salaryImpactChart?.skills.map((skill: string, index: number) => ({
    skill,
    salaryIncrease: chartData.salaryImpactChart.salaryAdd[index]
  }))

const peerComparisonData = Object.keys(comparisonData?.peerComparison?.yourLevel || {}).map(skill => ({
  skill: skill === 'SystemDesign' ? 'System Design' : skill,
  you: comparisonData?.peerComparison?.yourLevel?.[skill],
  mid: comparisonData?.peerComparison?.averageLevel_mid?.[skill],
  senior: comparisonData?.peerComparison?.targetLevel_senior?.[skill]
}))


  const geographyHeatmapData = Object.entries(geographyData?.skillDemandHeatmap || {}).flatMap(([category, skills]: [string, any]) => 
    Object.entries(skills).map(([skill, demand]: [string, any]) => ({
      category,
      skill,
      demand
    }))
  )

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium"
    switch (priority) {
      case 'high': return `${baseClasses} bg-orange-100 text-orange-800 border border-orange-200`
      case 'medium': return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`
      case 'low': return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`
      default: return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600'
      case 'medium-high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      case 'low-medium': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getMomentumColor = (momentum: string) => {
    switch (momentum) {
      case 'high': return 'text-green-600'
      case 'medium-high': return 'text-blue-600'
      case 'medium': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

const handleExportPdf = async () => {
  const element = document.getElementById('analysis-dashboard');
  
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth ,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    const date = new Date().toISOString().split('T')[0];
    pdf.save(`skills-analysis-report-${date}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};



  return (
    <div className="max-w-7xl mx-auto space-y-8" id='analysis-dashboard'>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Skills Analysis Dashboard</h1>
            <Button variant={"outline"} onClick={handleExportPdf }>
                Export Report
            </Button>
        </div>
        
        <div className="flex flex-wrap gap-6 text-sm text-gray-600" >
          <div className="bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
            <span className="font-medium text-orange-800">Consistency:</span>{' '}
            {userSkills?.learningVelocity?.consistencyScore}%
          </div>
          <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
            <span className="font-medium text-blue-800">Weekly Progress:</span>{' '}
            {userSkills?.learningVelocity?.averageWeeklyProgress}%
          </div>
          <div className="bg-green-50 px-3 py-1 rounded-lg border border-green-200">
            <span className="font-medium text-green-800">Current Strengths:</span>{' '}
            {userSkills?.currentStrengths?.join(', ')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill vs Market Demand</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="yourLevel" name="Your Level" fill="#ea580c" />
              <Bar dataKey="marketDemand" name="Market Demand" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Impact</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryImpactChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="salaryIncrease" name="Salary Increase (L)" fill="#ea580c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Peer Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={peerComparisonData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis />
              <Radar name="You" dataKey="you" stroke="#ea580c" fill="#ea580c" fillOpacity={0.3} />
              <Radar name="Mid Level" dataKey="mid" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
              <Radar name="Senior Target" dataKey="senior" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill Priorities</h2>
          <div className="space-y-4">
            {recommendationEngine?.skillPriorities?.map((item: any, index: number) => (
              <div key={index} className="border-l-4 border-orange-600 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900">{item.skill}</h3>
                  <span className={getPriorityBadge(item.priority)}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill Gap Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3 text-orange-600">Quick Wins</h3>
            <div className="space-y-4">
              {skillGapValue?.quickWins?.map((win: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{win.skill}</h4>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {win.valueIncrease}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Timeline: {win.timeline}</div>
                    <div className="flex items-center gap-2">
                      <span>Progress:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${(win.currentLevel / win.targetLevel) * 100}%` }}
                        ></div>
                      </div>
                      <span>{win.currentLevel}% → {win.targetLevel}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3 text-orange-600">High Value Gaps</h3>
            <div className="space-y-4">
              {skillGapValue?.highValueGaps?.map((gap: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{gap.skill}</h4>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {gap.valueIncrease}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Timeline: {gap.timeline}</div>
                    <div className="flex items-center gap-2">
                      <span>Progress:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${(gap.currentLevel / gap.targetLevel) * 100}%` }}
                        ></div>
                      </div>
                      <span>{gap.currentLevel}% → {gap.targetLevel}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Demand Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-green-600 mb-3">High Demand Skills</h3>
            <div className="space-y-3">
              {skillDemandData?.highDemandSkills?.map((skill: any, index: number) => (
                <div key={index} className="text-sm border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{skill.skill}</span>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {skill.demandScore}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">{skill.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-blue-600 mb-3">Stable Skills</h3>
            <div className="space-y-3">
              {skillDemandData?.stableSkills?.map((skill: any, index: number) => (
                <div key={index} className="text-sm border border-blue-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{skill.skill}</span>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {skill.demandScore}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">{skill.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-red-600 mb-3">Declining Skills</h3>
            <div className="space-y-3">
              {skillDemandData?.decliningSkills?.map((skill: any, index: number) => (
                <div key={index} className="text-sm border border-red-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{skill.skill}</span>
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                      {skill.demandScore}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs">{skill.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Impact Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-green-600 mb-3">Salary Boosters</h3>
            <div className="space-y-4">
              {salaryImpactData?.salaryBoosters?.map((booster: any, index: number) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900">{booster.skill}</h4>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{booster.premium}</span>
                      <span className={`text-xs block ${getImpactColor(booster.impact)}`}>
                        {booster.impact} impact
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{booster.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-blue-600 mb-3">Foundation Skills</h3>
            <div className="space-y-4">
              {salaryImpactData?.foundationSkills?.map((skill: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                    <div className="text-right">
                      <span className="text-sm font-medium text-blue-600">{skill.premium}</span>
                      <span className={`text-xs block ${getImpactColor(skill.impact)}`}>
                        {skill.impact} impact
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{skill.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Trend Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-green-600 mb-3">Growing Trends</h3>
            <div className="space-y-4">
              {trendAnalysis?.growingTrends?.map((trend: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{trend.area}</h4>
                    <div className="text-right">
                      <span className={`text-xs font-medium ${getMomentumColor(trend.momentum)}`}>
                        {trend.momentum} momentum
                      </span>
                      <div className="text-xs text-gray-500">{trend.adoptionRate} adoption</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{trend.whyImportant}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-purple-600 mb-3">Future Opportunities</h3>
            <div className="space-y-4">
              {trendAnalysis?.futureOpportunities?.map((opportunity: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{opportunity.skill}</h4>
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                      {opportunity.potential}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{opportunity.reason}</p>
                  <div className="text-xs text-gray-500">Timeline: {opportunity.timeline}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Geography Demand Heatmap</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={geographyHeatmapData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="skill" width={100} />
            <Tooltip />
            <Bar dataKey="demand" name="Demand Score">
              {geographyHeatmapData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.demand > 80 ? '#ea580c' : entry.demand > 60 ? '#f59e0b' : '#d1d5db'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Optimal Skill Combinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optimalCombinations?.powerCombos?.map((combo: any, index: number) => (
            <div key={index} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{combo.combo}</h3>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  {combo.demand}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{combo.whyItWorks}</p>
              <div className="text-sm font-medium text-orange-600">
                Market Value: {combo.marketValue}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Opportunity Cost Analysis</h2>
        <div className="space-y-4">
          {opportunityCost?.timeVsValue?.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{item.skill}</h3>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">{item.expectedReturn}</span>
                  <span className={getPriorityBadge(item.priority)}>
                    {item.priority} priority
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Time Investment: {item.timeInvestment}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Best Learning Investments</h2>
          <div className="space-y-4">
            {learningROI?.bestInvestments?.map((investment: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{investment.skill}</h3>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{investment.salaryBoost}</div>
                    <div className="text-xs text-gray-500 bg-orange-50 px-2 py-1 rounded">
                      ROI: {investment.roiScore}/100
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Time required: {investment.timeRequired}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">6-Month Projection</h2>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border border-orange-200">
            <div className="flex justify-center items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-gray-500 line-through">
                {projectionData?.sixMonthProjection?.currentValue}
              </span>
              <span className="text-4xl font-bold text-orange-600">
                {projectionData?.sixMonthProjection?.projectedValue}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p className="font-medium text-gray-900">Key Drivers:</p>
              <ul className="space-y-1 text-left">
                {projectionData?.sixMonthProjection?.keyDrivers?.map((driver: string, index: number) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-orange-500 mr-2">•</span>
                    {driver}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Success Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successPatterns?.whatWorks?.map((pattern: string, index: number) => (
            <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-sm text-gray-700">{pattern}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h2>
        <div className="space-y-4">
          {riskAssessment?.marketRisks?.map((risk: any, index: number) => (
            <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{risk.risk}</h3>
                <span className={`text-xs font-medium ${
                  risk.impact === 'high' ? 'text-red-600' : 
                  risk.impact === 'medium-high' ? 'text-orange-600' : 'text-yellow-600'
                }`}>
                  {risk.impact} impact
                </span>
              </div>
              <p className="text-sm text-gray-600">Mitigation: {risk.mitigation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personalized Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-orange-600 mb-3">Key Takeaways</h3>
            <ul className="space-y-2">
              {personalizedInsights?.keyTakeaways?.map((insight: string, index: number) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <span className="text-orange-500 mr-2">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-orange-600 mb-3">Immediate Actions</h3>
            <ul className="space-y-2">
              {personalizedInsights?.immediateActions?.map((action: string, index: number) => (
                <li key={index} className="flex items-start text-sm text-gray-700">
                  <span className="text-orange-500 mr-2">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewSpecificAnalysis