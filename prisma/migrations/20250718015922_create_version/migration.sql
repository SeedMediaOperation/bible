-- CreateTable
CREATE TABLE `Version` (
    `id` VARCHAR(191) NOT NULL,
    `titleEn` VARCHAR(191) NOT NULL,
    `titleKm` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Version_titleEn_key`(`titleEn`),
    UNIQUE INDEX `Version_titleKm_key`(`titleKm`),
    UNIQUE INDEX `Version_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
