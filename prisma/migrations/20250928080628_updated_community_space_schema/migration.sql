/*
  Warnings:

  - You are about to drop the column `logo` on the `CommunitySpace` table. All the data in the column will be lost.
  - The required column `joinCode` was added to the `CommunitySpace` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "public"."JoinMethod" AS ENUM ('INVITE', 'REQUEST', 'OPEN');

-- AlterTable
ALTER TABLE "public"."CommunityMember" ADD COLUMN     "joinMethod" "public"."JoinMethod" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "public"."CommunitySpace" DROP COLUMN "logo",
ADD COLUMN     "joinCode" TEXT NOT NULL;
