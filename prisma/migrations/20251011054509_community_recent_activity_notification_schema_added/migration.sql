-- CreateEnum
CREATE TYPE "public"."NotificationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."CommunitySpaceRecentActivity" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunitySpaceRecentActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunitySpaceNotification" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "priority" "public"."NotificationPriority" NOT NULL DEFAULT 'MEDIUM',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunitySpaceNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CommunitySpaceRecentActivity" ADD CONSTRAINT "CommunitySpaceRecentActivity_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "public"."CommunitySpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunitySpaceRecentActivity" ADD CONSTRAINT "CommunitySpaceRecentActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."CommunityMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunitySpaceNotification" ADD CONSTRAINT "CommunitySpaceNotification_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "public"."CommunitySpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunitySpaceNotification" ADD CONSTRAINT "CommunitySpaceNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."CommunityMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
