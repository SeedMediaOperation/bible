/*
  Warnings:

  - You are about to drop the column `versionId` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `versionId`;

-- AddForeignKey
ALTER TABLE `Version` ADD CONSTRAINT `Version_id_fkey` FOREIGN KEY (`id`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
