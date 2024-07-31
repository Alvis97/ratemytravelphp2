/*
  Warnings:

  - You are about to drop the column `countryInitials` on the `VisitedCountry` table. All the data in the column will be lost.
  - You are about to drop the column `englishLevelRating` on the `VisitedCountry` table. All the data in the column will be lost.
  - You are about to drop the column `priceRating` on the `VisitedCountry` table. All the data in the column will be lost.
  - You are about to drop the column `queerFriendlyRating` on the `VisitedCountry` table. All the data in the column will be lost.
  - You are about to drop the column `safetyRating` on the `VisitedCountry` table. All the data in the column will be lost.
  - You are about to drop the column `soloFriendlyRating` on the `VisitedCountry` table. All the data in the column will be lost.
  - You are about to drop the `EuCountry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `VisitedCountry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VisitedCountry" DROP COLUMN "countryInitials",
DROP COLUMN "englishLevelRating",
DROP COLUMN "priceRating",
DROP COLUMN "queerFriendlyRating",
DROP COLUMN "safetyRating",
DROP COLUMN "soloFriendlyRating",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "EuCountry";

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisitedCountry" ADD CONSTRAINT "VisitedCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
