/*
  Warnings:

  - Added the required column `bookId` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Version` DROP FOREIGN KEY `Version_id_fkey`;

-- AlterTable
ALTER TABLE `Version` ADD COLUMN `bookId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Version` ADD CONSTRAINT `Version_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
