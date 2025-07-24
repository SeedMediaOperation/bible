/*
  Warnings:

  - You are about to drop the column `pro_name` on the `Media` table. All the data in the column will be lost.
  - Added the required column `pro_name_En` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pro_name_Km` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Media` DROP COLUMN `pro_name`,
    ADD COLUMN `pro_name_En` VARCHAR(191) NOT NULL,
    ADD COLUMN `pro_name_Km` VARCHAR(191) NOT NULL;
