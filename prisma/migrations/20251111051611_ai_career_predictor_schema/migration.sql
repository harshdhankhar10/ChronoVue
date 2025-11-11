-- CreateTable
CREATE TABLE "public"."AICareerPredictor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentTimeline" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "optimizedTimeline" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "confidenceScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "jobReadyDate" TIMESTAMP(3),
    "timelineComparison" JSONB NOT NULL DEFAULT '{}',
    "daysSaved" JSONB NOT NULL DEFAULT '{}',
    "paceAnalysis" JSONB NOT NULL DEFAULT '{}',
    "skillsRadarData" JSONB NOT NULL DEFAULT '{}',
    "skillProgression" JSONB NOT NULL DEFAULT '{}',
    "riskAssessment" JSONB NOT NULL DEFAULT '{}',
    "successProbability" JSONB NOT NULL DEFAULT '{}',
    "careerPathScenarios" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "salaryProjections" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "companyTargets" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "roleMatches" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "skillGaps" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "whatToDos" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "whatNotToDos" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "successFactors" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "actionPlan" JSONB NOT NULL DEFAULT '{}',
    "marketInsights" JSONB NOT NULL DEFAULT '{}',
    "motivationAnalysis" JSONB NOT NULL DEFAULT '{}',
    "interviewReadiness" JSONB NOT NULL DEFAULT '{}',
    "resourcesRecommendations" JSONB NOT NULL DEFAULT '{}',
    "learningPatterns" JSONB NOT NULL DEFAULT '{}',
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "onboardingData" JSONB NOT NULL DEFAULT '{}',
    "predictionVersion" TEXT NOT NULL DEFAULT 'v1.0',
    "ratingInfo" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AICareerPredictor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AICareerPredictor_userId_key" ON "public"."AICareerPredictor"("userId");

-- AddForeignKey
ALTER TABLE "public"."AICareerPredictor" ADD CONSTRAINT "AICareerPredictor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
