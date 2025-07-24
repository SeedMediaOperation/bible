-- CreateTable
CREATE TABLE `Vlog` (
    `id` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `title_km` VARCHAR(191) NOT NULL,
    `paragraph_en` VARCHAR(191) NOT NULL,
    `paragraph_km` VARCHAR(191) NOT NULL,
    `video_Url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
