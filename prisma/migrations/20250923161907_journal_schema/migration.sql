-- CreateEnum
CREATE TYPE "public"."MOOD" AS ENUM ('HAPPY', 'SAD', 'NEUTRAL', 'EXCITED', 'ANXIOUS', 'GRATEFUL', 'STRESSED', 'MOTIVATED', 'REFLECTIVE');

-- CreateTable
CREATE TABLE "public"."Journal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "mood" "public"."MOOD" NOT NULL DEFAULT 'REFLECTIVE',
    "ai_suggestions" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Journal" ADD CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
