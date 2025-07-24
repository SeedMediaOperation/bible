/*
  Warnings:

  - Added the required column `version` to the `CatalogueBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CatalogueBook` ADD COLUMN `version` VARCHAR(191) NOT NULL;
