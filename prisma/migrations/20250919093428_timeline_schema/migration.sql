/*
  Warnings:

  - The values [CARRER] on the enum `TimelineCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."TimelineCategory_new" AS ENUM ('CAREER', 'EDUCATION', 'PERSONAL', 'FITNESS', 'FINANCE', 'ENTREPRENEURSHIP');
ALTER TABLE "public"."Timeline" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "public"."Timeline" ALTER COLUMN "category" TYPE "public"."TimelineCategory_new" USING ("category"::text::"public"."TimelineCategory_new");
ALTER TYPE "public"."TimelineCategory" RENAME TO "TimelineCategory_old";
ALTER TYPE "public"."TimelineCategory_new" RENAME TO "TimelineCategory";
DROP TYPE "public"."TimelineCategory_old";
ALTER TABLE "public"."Timeline" ALTER COLUMN "category" SET DEFAULT 'CAREER';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Timeline" ALTER COLUMN "category" SET DEFAULT 'CAREER';
