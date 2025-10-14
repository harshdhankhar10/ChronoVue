/*
  Warnings:

  - Made the column `coverImage` on table `CreatePost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CreatePost" ALTER COLUMN "coverImage" SET NOT NULL,
ALTER COLUMN "coverImage" SET DEFAULT 'https://prosportsoutlook.com/wp-content/themes/prosports/images/default-post-pic.png';
