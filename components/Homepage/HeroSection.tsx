"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowRight,
    Play,
    Sparkles,
    Users,
    TrendingUp,
    Clock,
    Zap,
    Target,
    Brain,
    CheckCircle,
    Star,
    Award,
    Rocket,
    Calendar,
    BarChart3,
    Shield,
    Globe,
    Building2,
    Briefcase,
    Trophy,
    Lightbulb,
    Layers,
} from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-32 pb-24">
            <div className=" bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/3 right-1/4 w-[800px] h-[500px] bg-gradient-to-bl from-accent/10 to-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-primary/8 to-accent/8 rounded-full blur-2xl -z-10" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-8xl mx-auto">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-[0.9]">
                                <span className="block mb-2">Transform Your</span>
                                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] block mb-2">
                                    Future Vision
                                </span>
                                <span className="block text-3xl sm:text-4xl lg:text-5xl text-muted-foreground font-medium">
                                    Into Actionable Reality
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground text-balance leading-relaxed max-w-2xl">
                                Harness the power of advanced AI to create interactive timelines, visualize your goals, and navigate
                                your path to success with unprecedented clarity and precision.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                                <Brain className="h-4 w-4" />
                                AI-Powered Insights
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-sm font-medium text-green-600">
                                <Target className="h-4 w-4" />
                                Goal Achievement
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
                                <Rocket className="h-4 w-4" />
                                10x Faster Planning
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className=" px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl  rounded-2xl"
                            >
                                <Zap className="mr-3 h-5 w-5" />
                                Start Your Journey Free
                                <ArrowRight className="ml-3 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-primary/30 hover:bg-primary/5 bg-background/80 backdrop-blur-sm px-8 py-6 text-lg font-medium rounded-2xl shadow-lg
                                hover:text-primary
                                hover:shadow-xl transition-all duration-300"
                            >
                                <Play className="mr-3 h-5 w-5" />
                                Watch 3-Min Demo
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-blue-500" />
                                <span>14-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-accent" />
                                <span>Cancel anytime</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center gap-2 mb-1">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span className="text-xl font-bold text-foreground">50K+</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Active Users</p>
                            </Card>

                            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    <span className="text-xl font-bold text-foreground">98%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Success Rate</p>
                            </Card>

                            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <span className="text-xl font-bold text-foreground">15+</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Hours Saved</p>
                            </Card>

                            <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center gap-2 mb-1">
                                    <Award className="h-5 w-5 text-yellow-500" />
                                    <span className="text-xl font-bold text-foreground">4.9</span>
                                </div>
                                <p className="text-xs text-muted-foreground">User Rating</p>
                            </Card>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary/20 bg-gradient-to-br from-card to-muted/20">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-ai-dashboard-interface-with-timeline-visual-FwGQ85sA9qT0ytTtrHod5825o5t8HN.jpg"
                                alt="ChronoVue AI Dashboard - Interactive Timeline Planning Interface"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

                            <div className="absolute top-6 left-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 hover:scale-105 transition-transform animate-float">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-semibold text-foreground">AI Analysis Active</span>
                                </div>
                                <div className="text-xs text-muted-foreground">Processing your goals...</div>
                                <div className="w-24 h-1 bg-muted rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full animate-pulse w-3/4" />
                                </div>
                            </div>

                            <div className="absolute top-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 hover:scale-105 transition-transform animate-float-delay-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold text-primary">Timeline Generated</span>
                                </div>
                                <div className="text-xs text-muted-foreground">⚡ 1.8s response time</div>
                                <div className="text-xs text-green-600 mt-1">✓ 94% accuracy score</div>
                            </div>

                            <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 hover:scale-105 transition-transform animate-float-delay-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="h-4 w-4 text-accent" />
                                    <span className="text-sm font-semibold text-foreground">Goal Progress</span>
                                </div>
                                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-3/4 animate-pulse" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">75% Complete • 3 days ahead</div>
                            </div>

                            <div className="absolute bottom-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 hover:scale-105 transition-transform animate-float-delay-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold text-foreground">Performance</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-lg font-bold text-green-600">+24%</div>
                                    <div className="text-xs text-muted-foreground">vs last month</div>
                                </div>
                            </div>

                        </div>

                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-2xl animate-pulse" />
                        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-2xl animate-pulse delay-1000" />
                        <div
                            className="absolute top-1/2 -left-8 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-bounce"
                            style={{ animationDelay: "2s" }}
                        />
                        <div
                            className="absolute top-1/4 -right-8 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-bounce"
                            style={{ animationDelay: "3s" }}
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default HeroSection