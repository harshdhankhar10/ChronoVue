/*
  Warnings:

  - You are about to drop the `AIChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AIChatMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AIChat" DROP CONSTRAINT "AIChat_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AIChatMessage" DROP CONSTRAINT "AIChatMessage_chatId_fkey";

-- DropTable
DROP TABLE "public"."AIChat";

-- DropTable
DROP TABLE "public"."AIChatMessage";
