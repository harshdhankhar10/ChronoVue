import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import WhyWeStandOutSection from './WhyWeStandOutSection'
import Footer from './Footer'
import { ArrowRight, BotMessageSquareIcon, ChartNoAxesGanttIcon, Check, FolderKanbanIcon, PlayIcon, SparklesIcon, TimerIcon, TrendingUpDownIcon } from 'lucide-react'

const HeroSection = () => {
    const steps = [
        {
          number: "01",
          title: "Define Your Goals",
          description: "Start by entering your personal, career, or educational goals.",
        },
        {
          number: "02",
          title: "Create Timeline",
          description: "Break down goals into milestones and create a visual timeline.",
        },
        {
          number: "03",
          title: "Get AI Insights",
          description: "Receive personalized recommendations to optimize your path.",
        },
        {
          number: "04",
          title: "Track & Celebrate",
          description: "Monitor progress and celebrate wins along the way.",
        },
      ]

  const features = [
  {
    id: "predictor",
    title: "AI Career Predictor",
    subtitle: "Get an exact job-readiness date with a transparent confidence score.",
    bullets: [
      "Explainable factors that influenced the prediction",
      "Role-specific timelines (Frontend / Full-Stack / Data)",
      "Instant refresh when you update skills",
    ],
    tag: "Core",
    icon: <TimerIcon className="w-6 h-6"/>,
  },
  {
    id: "market",
    title: "Market Skills Analysis",
    subtitle: "See which skills are rising, which pay more, and where demand is growing.",
    bullets: [
      "Heatmaps & trend charts",
      "Salary impact calculator",
      "Skill ROI recommendations",
    ],
    tag: "Data",
    icon: <TrendingUpDownIcon className="w-6 h-6"/>,
  },
  {
    id: "roadmaps",
    title: "Personalized Roadmaps",
    subtitle: "Role-based, time-bound learning paths that adapt as you progress.",
    bullets: [
      "Weekly action items & project suggestions",
      "Milestone breakdown with durations",
      "PDF export of your full roadmap",
    ],
    tag: "Action",
    icon: <FolderKanbanIcon className="w-6 h-6"/>,
  },
  {
    id: "insights",
    title: "AI Insights Dashboard",
    subtitle: "Skill radar, progress predictions and prioritized next steps at a glance.",
    bullets: [
      "Visual skill radar & readiness score",
      "Actionable next-step recommendations",
      "Historical progress & trend view",
    ],
    tag: "Insights",
    icon: <SparklesIcon className="w-6 h-6"/>,
  },
  {
    id: "timeline",
    title: "Interactive Timelines",
    subtitle: "Drag, edit and share timelines — visually plan your learning and hiring pushes.",
    bullets: [
      "Color-coded milestones & drag-and-drop",
      "Shareable public timeline links",
      "Timeline comparison: current vs optimized",
    ],
    tag: "UX",
    icon: <ChartNoAxesGanttIcon className="w-6 h-6"/>,
  },
  {
    id: "assistant",
    title: "ChronoAI Assistant",
    subtitle: "Chat with a contextual career assistant that uses your profile to give precise answers.",
    bullets: [
      "Mock interview practice & feedback",
      "Study plans and micro-tasks on request",
      "Context-aware suggestions based on timelines",
    ],
    tag: "Assistant",
    icon: <BotMessageSquareIcon className="w-6 h-6"/>,
  },
];

const communityItems = [
            { icon: "💬", title: "Forums", desc: "Share experiences and get advice" },
            { icon: "🏆", title: "Challenges", desc: "Participate in community challenges" },
            { icon: "🤝", title: "Mentorship", desc: "Connect with experienced mentors" },
          ];

    
  return (
    <>
      <section className="relative pt-[216px] pb-16">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          <div className="max-w-[937px] flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-6">
              <h1 className="max-w-[748px] text-center text-[#37322f] text-5xl md:text-[80px] font-normal leading-tight md:leading-[96px] font-serif">
                Visualize your journey to success
              </h1>
              <p className="max-w-[506px] text-center text-[#37322f]/80 text-lg font-medium leading-7">
                ChronoVue transforms your goals into interactive timelines. Plan smarter, track progress in real-time,
                and achieve more with AI-powered insights.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
           <Link href="/signup">
           <Button className="h-10 px-12 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full font-medium text-sm shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset]">
              Start planning free
            </Button>
           </Link>
          </div>
        </div>
      </div>
    </section>
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
                <div className="text-5xl font-bold text-orange-200 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-8 bg-orange-600 rounded-full border-4 border-white"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-16 px-4 bg-white" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Powerful features that get you job-ready — faster
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            ChronoVue combines market data, AI prediction, and a visual timeline workflow to create a clear, actionable path to your dream role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.id}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg  text-primary border border-primary border-2 flex items-center justify-center">
                  <span className="inline-block">
                    {f.icon}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{f.subtitle}</p>
                </div>

                <div className="ml-auto hidden sm:flex items-center">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">{f.tag}</span>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {f.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="mt-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-sm text-orange-600">✓</span>
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">Want a guided walkthrough? Get a free sample prediction and see your timeline.</p>
          <Link
            href="/signup"
          >
            <Button>
              Get my free prediction
            <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-orange-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Join Our Community</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communityItems.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <WhyWeStandOutSection/>
     <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto rounded-3xl bg-slate-900 relative overflow-hidden reveal">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-chrono-orange/20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-chrono-purple/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-4">
                       <SparklesIcon className="w-4 h-4 text-primary"/>
                       Prediction Engine
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">See the future.<br/>Then change it.</h2>
                    <p className="text-slate-400 leading-relaxed mb-8">
                        Our engine calculates your "Job Readiness Score" in real-time. It adapts as you learn, pulling in market data to ensure you're always aiming for a moving target.
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-slate-300 text-sm">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <Check className="w-3 h-3"/></div>
                            Confidence Score based on market volatility
                        </li>
                        <li className="flex items-center gap-3 text-slate-300 text-sm">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Check className="w-3 h-3"/></div>
                            Skill Gap Summary updated daily
                        </li>
                        <li className="flex items-center gap-3 text-slate-300 text-sm">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Check className="w-3 h-3"/></div>
                            Top 3 high-ROI actions
                        </li>
                    </ul>

                    <Link href="/signup">
                    <Button variant={"outline"} className='text-white'>
                        Get My Prediction
                    </Button>
                    </Link>
                </div>

                <div className=" bg-black rounded-xl p-8 relative border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Predicted Job Ready Date</p>
                        <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">October 14, 2025</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5 text-center">
                            <p className="text-2xl font-bold text-primary">94%</p>
                            <p className="text-xs text-slate-500 uppercase mt-1">Confidence</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5 text-center">
                            <p className="text-2xl font-bold text-white">3</p>
                            <p className="text-xs text-slate-500 uppercase mt-1">Skill Gaps</p>
                        </div>
                    </div>

                    <div className="bg-gradient-brand p-[1px] rounded-lg">
                        <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-between border border-primary border-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white">
                                    <PlayIcon className="w-4 h-4"/>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold">Next: Learn GraphQL</p>
                                    <p className="text-slate-400 text-xs">+2 weeks to timeline</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>

    </>
  )
}

export default HeroSection