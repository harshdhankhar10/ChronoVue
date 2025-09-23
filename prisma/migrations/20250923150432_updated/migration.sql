/*
  Warnings:

  - You are about to drop the column `tags` on the `Reflection` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `SubTask` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `SubTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Reflection" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "public"."SubTask" DROP COLUMN "priority",
DROP COLUMN "status";
