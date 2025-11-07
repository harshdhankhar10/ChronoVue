-- AlterTable
ALTER TABLE "public"."MentorProfile" ADD COLUMN     "reasonForDeactivation" TEXT,
ADD COLUMN     "reasonForNotVerification" JSONB;
