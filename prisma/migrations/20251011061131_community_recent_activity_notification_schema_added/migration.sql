-- DropForeignKey
ALTER TABLE "public"."CommunitySpaceRecentActivity" DROP CONSTRAINT "CommunitySpaceRecentActivity_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."CommunitySpaceRecentActivity" ADD CONSTRAINT "CommunitySpaceRecentActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
