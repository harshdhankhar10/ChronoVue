import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Target, TrendingUp, BookOpen, Briefcase, Users, Star, CheckCircle, Clock, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Homepage/Footer'

const UseCasesPage = () => {
  const primaryUseCases = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learning Path Planning",
      description: "Structure your learning journey with clear milestones and deadlines",
      scenario: "You want to learn web development but don't know where to start or how long it will take",
      solution: "Get a personalized timeline with weekly learning goals and project milestones",
      features: [
        "Structured curriculum breakdown",
        "Time estimates for each skill",
        "Project completion tracking",
        "Progress validation checks"
      ],
      outcome: "Complete learning goals 40% faster with clear direction",
      users: ["Students", "Self-learners", "Career changers"],
      timeline: "3-12 months"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Transition Strategy",
      description: "Plan and execute a successful career change into tech",
      scenario: "You're in marketing but want to become a frontend developer within 12 months",
      solution: "Create a step-by-step transition plan with skill acquisition and job search phases",
      features: [
        "Skill gap analysis",
        "Portfolio project timeline",
        "Networking milestones",
        "Interview preparation schedule"
      ],
      outcome: "Successfully transition careers with minimized financial impact",
      users: ["Career changers", "Industry switchers"],
      timeline: "6-18 months"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Advancement",
      description: "Strategic planning for promotions and skill development",
      scenario: "You're a mid-level developer aiming for senior position in 18 months",
      solution: "Map out the skills, projects, and experience needed for your target role",
      features: [
        "Promotion requirement tracking",
        "Leadership skill development",
        "Mentorship goals",
        "Salary negotiation preparation"
      ],
      outcome: "Achieve targeted promotions with clear justification",
      users: ["Professionals", "Managers", "Individual contributors"],
      timeline: "12-24 months"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Project-Based Skill Building",
      description: "Learn through building real projects with deadlines",
      scenario: "You want to build a portfolio but struggle with scope and completion",
      solution: "Break down complex projects into manageable phases with time estimates",
      features: [
        "Project milestone planning",
        "Skill application tracking",
        "Deadline management",
        "Portfolio completion goals"
      ],
      outcome: "Build impressive portfolio projects without overwhelm",
      users: ["Developers", "Designers", "Creatives"],
      timeline: "1-6 months per project"
    }
  ]

  const industryUseCases = [
    {
      industry: "Tech & Software Development",
      cases: [
        "Full-stack developer learning path",
        "Specialization transition (frontend to backend)",
        "New framework adoption timeline",
        "Open source contribution goals"
      ]
    },
    {
      industry: "Data Science & Analytics",
      cases: [
        "Data science career transition",
        "Machine learning specialization",
        "Tool and language proficiency building",
        "Portfolio project completion"
      ]
    },
    {
      industry: "Design & UX",
      cases: [
        "Design tool mastery timeline",
        "Portfolio development schedule",
        "Specialization path (UI/UX/Product)",
        "Client project delivery planning"
      ]
    },
    {
      industry: "Product Management",
      cases: [
        "PM career progression planning",
        "Certification and skill development",
        "Side project management",
        "Leadership skill building"
      ]
    }
  ]

  const userStories = [
    {
      name: "Sarah Chen",
      role: "Former Accountant → Frontend Developer",
      story: "Used ChronoVue to transition careers in 9 months. The timeline kept me on track and the AI predictions adjusted as I learned faster than expected.",
      outcome: "Landed first developer job with 25% salary increase",
      duration: "9 months"
    },
    {
      name: "Marcus Johnson",
      role: "Junior → Senior Developer",
      story: "The career advancement timeline helped me identify and fill skill gaps systematically. I achieved my promotion 3 months ahead of schedule.",
      outcome: "Promoted to Senior Developer in 15 months",
      duration: "15 months"
    },
    {
      name: "Alex Rivera",
      role: "Computer Science Student",
      story: "As a student, ChronoVue helped me balance coursework with practical skill building. I graduated with 4 portfolio projects and multiple offers.",
      outcome: "Multiple job offers before graduation",
      duration: "2 years"
    }
  ]

  const process = [
    {
      step: "01",
      title: "Define Your Goal",
      description: "Set clear, measurable objectives with target dates",
      icon: <Target className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Input Your Starting Point",
      description: "Add your current skills, experience, and availability",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Generate Timeline",
      description: "Get AI-powered milestone planning with confidence scores",
      icon: <Zap className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Execute & Adjust",
      description: "Track progress and adapt timeline as you learn",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ]

  return (
    <>
   <Navbar/>
     <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
            Real Use Cases, Real Results
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            See how professionals across industries use ChronoVue to achieve their career goals with clarity and confidence.
          </p>
          <Link href="/signup">
            <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-8 py-3 rounded-full">
              Start Your Use Case
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Common Use Cases</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Discover how ChronoVue solves specific career planning challenges
          </p>

          <div className="space-y-12">
            {primaryUseCases.map((useCase, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                    {useCase.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{useCase.description}</p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Scenario:</h4>
                    <p className="text-gray-600 text-sm">{useCase.scenario}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">ChronoVue Solution:</h4>
                    <p className="text-gray-600 mb-4">{useCase.solution}</p>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Users className="w-4 h-4 mr-2" />
                        Ideal For:
                      </div>
                      <div className="text-gray-700">{useCase.users.join(", ")}</div>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Clock className="w-4 h-4 mr-2" />
                        Typical Timeline:
                      </div>
                      <div className="text-gray-700">{useCase.timeline}</div>
                    </div>
                  </div>
                </div>

                <div className={`bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-orange-600 font-semibold mb-4">
                      <Star className="w-5 h-5" />
                      Expected Outcome
                    </div>
                    <p className="text-gray-800 font-semibold">{useCase.outcome}</p>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Confidence Score</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-blue-600">88%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time Saved</span>
                      <span className="font-semibold text-purple-600">2-4 months</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Industry Applications</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Tailored use cases for different tech domains and roles
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {industryUseCases.map((industry, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{industry.industry}</h3>
                <ul className="space-y-3">
                  {industry.cases.map((useCase, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Success Stories</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Real people, real timelines, real career transformations
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {userStories.map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 italic">"{story.story}"</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Outcome:</span>
                    <span className="font-semibold text-green-600">{story.outcome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Timeline:</span>
                    <span className="font-semibold text-blue-600">{story.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How to Apply ChronoVue to Your Goals</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {process.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Create Your Success Story?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands who have transformed their career planning with ChronoVue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button>
                Start Your Journey
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="outline" >
                Explore Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
   <Footer/>
    </>
  )
}

export default UseCasesPage