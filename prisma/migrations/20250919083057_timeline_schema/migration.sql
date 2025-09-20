-- CreateEnum
CREATE TYPE "public"."TimelineCategory" AS ENUM ('CARRER', 'EDUCATION', 'PERSONAL', 'FITNESS', 'FINANCE', 'ENTREPRENEURSHIP');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Timeline" (
    "id" TEXT NOT NULL,
    "category" "public"."TimelineCategory" NOT NULL DEFAULT 'CARRER',
    "duration" "public"."TimeHorizon" NOT NULL DEFAULT 'ONE_YEAR',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "risk_challanges" TEXT NOT NULL,
    "resources_needed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."MileStone" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'NOT_STARTED',
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "tags" TEXT[],
    "timelineId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_id_key" ON "public"."Timeline"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MileStone_id_key" ON "public"."MileStone"("id");

-- AddForeignKey
ALTER TABLE "public"."MileStone" ADD CONSTRAINT "MileStone_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "public"."Timeline"("id") ON DELETE SET NULL ON UPDATE CASCADE;
