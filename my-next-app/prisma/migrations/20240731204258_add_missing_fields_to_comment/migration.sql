/*
  Warnings:

  - Added the required column `Image` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronounce` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "Image" TEXT,
ADD COLUMN     "age" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "pronounce" TEXT;
