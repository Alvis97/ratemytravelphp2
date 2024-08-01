/*
  Warnings:

  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
-- Set default role for existing NULL values
UPDATE "User" SET "role" = 'user' WHERE "role" IS NULL;

-- Continue with making the column NOT NULL
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL;
