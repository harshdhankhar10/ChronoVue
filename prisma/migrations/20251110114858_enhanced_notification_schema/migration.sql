-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('INFO', 'WARNING', 'ALERT');

-- CreateEnum
CREATE TYPE "public"."NotificationSender" AS ENUM ('SYSTEM', 'USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."Notification" ADD COLUMN     "sender" "public"."NotificationSender" NOT NULL DEFAULT 'SYSTEM',
ADD COLUMN     "senderId" TEXT,
ADD COLUMN     "type" "public"."NotificationType" NOT NULL DEFAULT 'INFO';
