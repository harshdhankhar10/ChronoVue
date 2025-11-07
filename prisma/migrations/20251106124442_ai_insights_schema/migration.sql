-- CreateEnum
CREATE TYPE "public"."InsightType" AS ENUM ('CAREER', 'EDUCATION', 'HEALTH', 'FINANCE', 'PERSONAL_GROWTH', 'ENTREPRENEURSHIP');

-- CreateEnum
CREATE TYPE "public"."GenerationTrigger" AS ENUM ('USER_ACTION', 'SCHEDULED_GENERATION', 'SYSTEM_AUTO_GENERATION');

-- CreateTable
CREATE TABLE "public"."AIInsight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "public"."InsightType" NOT NULL,
    "period" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT 'v1.0',
    "generationTrigger" "public"."GenerationTrigger" NOT NULL,
    "dataSnapshot" JSONB NOT NULL,
    "dataSources" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "keyFindings" JSONB NOT NULL,
    "confidence" INTEGER NOT NULL,
    "recommendations" JSONB NOT NULL,
    "riskAnalysis" JSONB,
    "skillGaps" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isHelpful" BOOLEAN,
    "userComment" TEXT,
    "actionItemsCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalActionItems" INTEGER NOT NULL DEFAULT 0,
    "creditsUsed" INTEGER NOT NULL DEFAULT 1,
    "shouldRegenerate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIInsight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AIInsight" ADD CONSTRAINT "AIInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
