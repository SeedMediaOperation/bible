/*
  Warnings:

  - Added the required column `titleEn` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleKm` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chapter` ADD COLUMN `titleEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleKm` VARCHAR(191) NOT NULL;
