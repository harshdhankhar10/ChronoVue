-- CreateEnum
CREATE TYPE "public"."PostType" AS ENUM ('POST', 'TIMELINE', 'MILESTONE', 'GOAL');

-- AlterTable
ALTER TABLE "public"."CommunitySpace" ADD COLUMN     "canUsersCreatePosts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxMembers" INTEGER NOT NULL DEFAULT 240;

-- AlterTable
ALTER TABLE "public"."CreatePost" ADD COLUMN     "mileStoneData" JSONB,
ADD COLUMN     "postType" "public"."PostType" NOT NULL DEFAULT 'POST',
ADD COLUMN     "timelineData" JSONB;
