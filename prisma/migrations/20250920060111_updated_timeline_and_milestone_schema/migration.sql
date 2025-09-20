/*
  Warnings:

  - Added the required column `userId` to the `MileStone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Timeline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MileStone" ADD COLUMN     "ai_suggestions" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Timeline" ADD COLUMN     "ai_suggestions" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."SubTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "status" "public"."Status" NOT NULL DEFAULT 'NOT_STARTED',
    "mileStoneId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reflection" (
    "id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "mileStoneId" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reflection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MileStone" ADD CONSTRAINT "MileStone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubTask" ADD CONSTRAINT "SubTask_mileStoneId_fkey" FOREIGN KEY ("mileStoneId") REFERENCES "public"."MileStone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reflection" ADD CONSTRAINT "Reflection_mileStoneId_fkey" FOREIGN KEY ("mileStoneId") REFERENCES "public"."MileStone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
