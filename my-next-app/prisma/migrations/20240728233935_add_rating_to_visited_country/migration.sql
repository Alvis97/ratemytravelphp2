/*
  Warnings:

  - Added the required column `rating` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VisitedCountry" ADD COLUMN     "rating" INTEGER NOT NULL;
