import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, GraduationCap, Briefcase, RefreshCw, Target, Zap, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Homepage/Footer'

const SolutionsPage = () => {
  const userSegments = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Students & Graduates",
      description: "Transition from education to career with confidence",
      challenges: [
        "Unclear career paths after graduation",
        "Skill gaps between education and industry needs",
        "Competitive job market positioning"
      ],
      solutions: [
        "Personalized career roadmaps",
        "Industry skill requirements analysis",
        "Job readiness timeline prediction"
      ],
      outcome: "Land your first tech job 30% faster"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Career Changers",
      description: "Successfully pivot to tech roles",
      challenges: [
        "Uncertain transition timelines",
        "Overwhelming learning paths",
        "Proving skills to employers"
      ],
      solutions: [
        "Structured transition plans",
        "Market-demand skill prioritization",
        "Portfolio project timeline"
      ],
      outcome: "Confident career transition with clear milestones"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Professionals Leveling Up",
      description: "Advance your career strategically",
      challenges: [
        "Stagnant career growth",
        "Unclear promotion requirements",
        "Keeping skills market-relevant"
      ],
      solutions: [
        "Skill gap analysis",
        "Promotion timeline planning",
        "Continuous learning schedules"
      ],
      outcome: "Achieve promotions and salary increases efficiently"
    }
  ]

  const solutions = [
    {
      title: "AI-Powered Career Predictor",
      description: "Get accurate job readiness dates with transparent confidence scores",
      features: [
        "Real-time market data integration",
        "Personalized timeline adjustments",
        "Confidence scoring with explanations"
      ],
      benefit: "Know exactly when you'll be job-ready"
    },
    {
      title: "Visual Timeline Planning",
      description: "Drag-and-drop interface to plan and adjust your career journey",
      features: [
        "Interactive milestone tracking",
        "Progress visualization",
        "Shareable timeline links"
      ],
      benefit: "See your entire career path at a glance"
    },
    {
      title: "Skill Market Analysis",
      description: "Data-driven insights on skill demand and salary impact",
      features: [
        "Real-time skill demand tracking",
        "Salary impact calculator",
        "ROI-based learning recommendations"
      ],
      benefit: "Learn what actually matters in today's market"
    },
    {
      title: "Personalized Roadmaps",
      description: "Adaptive learning paths that evolve with your progress",
      features: [
        "Weekly actionable tasks",
        "Project suggestions",
        "Milestone duration estimates"
      ],
      benefit: "Never wonder what to learn next"
    }
  ]

  const successMetrics = [
    { metric: "2.5 months", description: "Average time saved in job search" },
    { metric: "94%", description: "User confidence in career direction" },
    { metric: "3.2x", description: "Faster skill acquisition with guided paths" },
    { metric: "87%", description: "Achieve primary career goals within timeline" }
  ]

  return (
    <>
   <Navbar />
     <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
            Solutions for Every Career Stage
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Whether you're starting out, changing paths, or advancing your career— 
            ChronoVue provides the clarity and tools you need to succeed.
          </p>
          <Link href="/signup">
            <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-8 py-3 rounded-full">
              Find Your Solution
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Who We Help</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Tailored solutions for different career journeys and challenges
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {userSegments.map((segment, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                  {segment.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{segment.title}</h3>
                <p className="text-gray-600 mb-6">{segment.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Common Challenges:</h4>
                  <ul className="space-y-2">
                    {segment.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-2 text-gray-400" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Our Solution:</h4>
                  <ul className="space-y-2">
                    {segment.solutions.map((solution, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-sm font-semibold text-orange-800">{segment.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How We Solve Career Planning</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Powerful tools combined with intelligent insights to guide your journey
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>

                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-800">Key Benefit: {solution.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Results</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            See how ChronoVue users achieve their career goals faster and with more confidence
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {successMetrics.map((metric, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{metric.metric}</div>
                <div className="text-gray-600 text-sm">{metric.description}</div>
              </div>
            ))}
          </div>

          <Link href="/signup">
            <Button >
              Start Achieving Results
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Solve Your Career Challenges?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join professionals who have found clarity and direction with ChronoVue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button >
                Get Started Free
              </Button>
            </Link>
            <Link href="/use-cases">
              <Button variant="outline">
                View Use Cases
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
   <Footer />
    </>
  )
}

export default SolutionsPage