-- CreateTable
CREATE TABLE `Catalogue` (
    `id` VARCHAR(191) NOT NULL,
    `name_en` VARCHAR(191) NOT NULL,
    `name_km` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogueBook` (
    `id` VARCHAR(191) NOT NULL,
    `catalogueId` VARCHAR(191) NOT NULL,
    `name_en` VARCHAR(191) NOT NULL,
    `name_km` VARCHAR(191) NOT NULL,
    `type_en` VARCHAR(191) NOT NULL,
    `type_km` VARCHAR(191) NOT NULL,
    `size_en` VARCHAR(191) NOT NULL,
    `size_km` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CatalogueBook` ADD CONSTRAINT `CatalogueBook_catalogueId_fkey` FOREIGN KEY (`catalogueId`) REFERENCES `Catalogue`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
