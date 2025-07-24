-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_versionId_fkey`;

-- DropIndex
DROP INDEX `Book_versionId_fkey` ON `Book`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_versionId_fkey` FOREIGN KEY (`versionId`) REFERENCES `Version`(`slug`) ON DELETE CASCADE ON UPDATE CASCADE;
