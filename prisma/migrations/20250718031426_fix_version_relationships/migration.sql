/*
  Warnings:

  - You are about to drop the column `bookId` on the `Version` table. All the data in the column will be lost.
  - Added the required column `versionId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Version` DROP FOREIGN KEY `Version_bookId_fkey`;

-- DropIndex
DROP INDEX `Version_bookId_fkey` ON `Version`;

-- AlterTable
ALTER TABLE `Book` ADD COLUMN `versionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Version` DROP COLUMN `bookId`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_versionId_fkey` FOREIGN KEY (`versionId`) REFERENCES `Version`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
