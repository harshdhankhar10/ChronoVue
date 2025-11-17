-- CreateTable
CREATE TABLE "public"."ContactUs" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MarketSkillsAnalysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userSkills" JSONB NOT NULL DEFAULT '{}',
    "skillLevels" JSONB NOT NULL DEFAULT '{}',
    "learningVelocity" JSONB NOT NULL DEFAULT '{}',
    "skillDemandData" JSONB NOT NULL DEFAULT '{}',
    "salaryImpactData" JSONB NOT NULL DEFAULT '{}',
    "trendAnalysis" JSONB NOT NULL DEFAULT '{}',
    "geographyData" JSONB NOT NULL DEFAULT '{}',
    "skillGapValue" JSONB NOT NULL DEFAULT '{}',
    "learningROI" JSONB NOT NULL DEFAULT '{}',
    "optimalCombinations" JSONB NOT NULL DEFAULT '{}',
    "opportunityCost" JSONB NOT NULL DEFAULT '{}',
    "chartData" JSONB NOT NULL DEFAULT '{}',
    "heatmapData" JSONB NOT NULL DEFAULT '{}',
    "comparisonData" JSONB NOT NULL DEFAULT '{}',
    "projectionData" JSONB NOT NULL DEFAULT '{}',
    "personalizedInsights" JSONB NOT NULL DEFAULT '{}',
    "recommendationEngine" JSONB NOT NULL DEFAULT '{}',
    "successPatterns" JSONB NOT NULL DEFAULT '{}',
    "riskAssessment" JSONB NOT NULL DEFAULT '{}',
    "version" TEXT NOT NULL DEFAULT 'v1.0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketSkillsAnalysis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MarketSkillsAnalysis" ADD CONSTRAINT "MarketSkillsAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
