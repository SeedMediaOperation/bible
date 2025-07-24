-- DropIndex
DROP INDEX `Book_nameEn_key` ON `Book`;

-- DropIndex
DROP INDEX `Book_nameKm_key` ON `Book`;

-- DropIndex
DROP INDEX `Version_titleEn_key` ON `Version`;

-- DropIndex
DROP INDEX `Version_titleKm_key` ON `Version`;

-- AlterTable
ALTER TABLE `Catalogue` MODIFY `image` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `CatalogueBook` MODIFY `image` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `profile` TEXT NULL;

-- AlterTable
ALTER TABLE `Vlog` MODIFY `paragraph_en` TEXT NOT NULL,
    MODIFY `paragraph_km` TEXT NOT NULL,
    MODIFY `video_Url` TEXT NOT NULL;
