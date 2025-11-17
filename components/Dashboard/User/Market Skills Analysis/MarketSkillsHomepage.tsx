"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { BarChart, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'


const MarketSkillsHomepage = ({ analysis }: any) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const totalAnalysisCount = analysis?.length || 0



  const handleGenerateAnalysis = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/dashboard/marketSkills-analysis')
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Analysis Generated',
          text: 'Your market skills analysis has been generated successfully.',
        })
        router.refresh()
      }

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred while generating the analysis.',
      })
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      {totalAnalysisCount > 0 ? <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4">
            View your Market Skills Analysis Reports
          </h1>
          <Button onClick={handleGenerateAnalysis} disabled={loading} >
            Generate New Analysis
          </Button>
        </div>
        {analysis.map((analysis: any) => {
          const skillDemandData = analysis.skillDemandData || {};
          const salaryImpactData = analysis.salaryImpactData || {};
          const skillGapValue = analysis.skillGapValue || {};

          return (
            <div key={analysis.id} className="border-4 border-primary p-4 rounded mb-4">
              <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                {analysis.version}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">High Demand Skills</div>
                  <div className="font-semibold">
                    {skillDemandData.highDemandSkills ? skillDemandData.highDemandSkills.length : 0}
                  </div>
                  <div className="text-xs text-green-600">
                    {skillDemandData.highDemandSkills?.[0]?.skill || 'No data'}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Salary Boost Potential</div>
                  <div className="font-semibold">
                    {salaryImpactData.salaryBoosters?.[0]?.premium || '₹0L'}
                  </div>
                  <div className="text-xs text-blue-600">
                    Top skill: {salaryImpactData.salaryBoosters?.[0]?.skill || 'None'}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">High Value Gaps</div>
                  <div className="font-semibold">
                    {skillGapValue.highValueGaps ? skillGapValue.highValueGaps.length : 0}
                  </div>
                  <div className="text-xs text-orange-600">
                    {skillGapValue.highValueGaps?.[0]?.skill || 'No gaps'}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Learning ROI Score</div>
                  <div className="font-semibold">
                    {analysis.learningROI?.bestInvestments?.[0]?.roiScore || 0}/100
                  </div>
                  <div className="text-xs text-purple-600">
                    Best: {analysis.learningROI?.bestInvestments?.[0]?.skill || 'N/A'}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Skill Combinations</div>
                  <div className="font-semibold">
                    {analysis.optimalCombinations?.powerCombos ? analysis.optimalCombinations.powerCombos.length : 0}
                  </div>
                  <div className="text-xs text-green-600">
                    Value: {analysis.optimalCombinations?.powerCombos?.[0]?.marketValue || '₹0L'}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Created</div>
                  <div className="font-semibold text-sm">
                    {formatDate(analysis.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {analysis.updatedAt && `Updated: ${formatDate(analysis.updatedAt)}`}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button onClick={() => router.push(`/dashboard/user/market-skills-analysis?analysisId=${analysis.id}`)}
                  className="bg-orange-600 hover:bg-orange-700">
                  View Full Analysis
                </Button>

              </div>
            </div>
          )
        })}
      </div> : (
        <div className="text-center py-12">
          <div className="max-w-2xl mx-auto">

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Your Skills' Market Value
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              See exactly how much your current skills are worth in today's job market and which ones will give you the biggest salary boost.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold"><IndianRupee className="w-5 h-5" /></span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Salary Insights</h3>
                <p className="text-sm text-gray-600">See how each skill affects your earning potential</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Demand Trends</h3>
                <p className="text-sm text-gray-600">Identify growing vs declining skills in the market</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">% </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">ROI Analysis</h3>
                <p className="text-sm text-gray-600">Learn which skills give the best return on learning time</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2">Ready to Unlock Your Earning Potential?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get your personalized skill market analysis and discover where to focus your learning efforts.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button onClick={handleGenerateAnalysis} disabled={loading} >
                  {loading ? 'Generating...' : 'Generate Analysis (35 credits)'}
                </Button>
                <div className="text-left">
                  <div className="text-xs text-gray-500">What you'll get:</div>
                  <div className="text-xs text-gray-600">• Personalized skill valuation<br />• Market demand charts<br />• Salary impact analysis</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No automatic charges • On demand analysis • Personal data privacy respected </span>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default MarketSkillsHomepage