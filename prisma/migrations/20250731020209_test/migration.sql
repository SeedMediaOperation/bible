-- AlterTable
ALTER TABLE `Chapter` MODIFY `paragraphEn` LONGTEXT NOT NULL,
    MODIFY `paragraphKm` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `ReadingDate` (
    `id` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `title_km` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
