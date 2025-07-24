/*
  Warnings:

  - You are about to drop the column `chapterId` on the `Highlight` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Highlight` table. All the data in the column will be lost.
  - You are about to drop the column `lineIndex` on the `Highlight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Highlight` DROP COLUMN `chapterId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `lineIndex`;
