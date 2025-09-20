/*
  Warnings:

  - The `risk_challanges` column on the `Timeline` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `resources_needed` column on the `Timeline` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Timeline" DROP COLUMN "risk_challanges",
ADD COLUMN     "risk_challanges" TEXT[],
DROP COLUMN "resources_needed",
ADD COLUMN     "resources_needed" TEXT[];
