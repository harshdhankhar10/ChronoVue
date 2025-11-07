-- CreateEnum
CREATE TYPE "public"."SessionType" AS ENUM ('ONE_ON_ONE', 'VIDEO_CALL', 'WEBINAR', 'WORKSHOP');

-- CreateEnum
CREATE TYPE "public"."SessionStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isMentor" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."MentorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "expertise" TEXT[],
    "experienceYears" INTEGER,
    "timezone" TEXT,
    "availabilitySlots" JSONB[],
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentJob" JSONB,
    "pastJobs" JSONB[],
    "socialProfiles" JSONB[],
    "technicalSkills" TEXT[],
    "softSkills" TEXT[],
    "certifications" JSONB[],
    "specializations" TEXT[],
    "mentoringCategories" TEXT[],
    "targetAudiences" TEXT[],
    "sessionTypesOffered" "public"."SessionType"[],
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "applicationQuestions" JSONB[],
    "isAgreedToTerms" BOOLEAN NOT NULL DEFAULT false,
    "codeOfConductAgreement" BOOLEAN NOT NULL DEFAULT false,
    "backgroundCheckAgreement" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MentorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MentorSession" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "mentorUserId" TEXT,
    "sessionType" "public"."SessionType" NOT NULL,
    "topic" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."SessionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "feedback" JSONB,
    "paymentDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MentorProfile_userId_key" ON "public"."MentorProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."MentorProfile" ADD CONSTRAINT "MentorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MentorSession" ADD CONSTRAINT "MentorSession_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "public"."MentorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MentorSession" ADD CONSTRAINT "MentorSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MentorSession" ADD CONSTRAINT "MentorSession_mentorUserId_fkey" FOREIGN KEY ("mentorUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
