/*
  Warnings:

  - You are about to drop the column `paymentDetails` on the `MentorSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."MentorSession" DROP COLUMN "paymentDetails",
ADD COLUMN     "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING';
