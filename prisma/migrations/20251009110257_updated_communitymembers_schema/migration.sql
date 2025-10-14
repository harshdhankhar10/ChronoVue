-- CreateEnum
CREATE TYPE "public"."MemberStatus" AS ENUM ('ACTIVE', 'PENDING', 'BANNED');

-- AlterTable
ALTER TABLE "public"."CommunityMember" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "public"."MemberStatus" NOT NULL DEFAULT 'ACTIVE';
