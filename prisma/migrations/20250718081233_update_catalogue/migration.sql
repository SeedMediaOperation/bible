/*
  Warnings:

  - Added the required column `slug` to the `Catalogue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Catalogue` ADD COLUMN `slug` VARCHAR(191) NOT NULL;
