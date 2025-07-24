/*
  Warnings:

  - You are about to alter the column `paragraphEn` on the `Chapter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `paragraphKm` on the `Chapter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Chapter` MODIFY `paragraphEn` JSON NOT NULL,
    MODIFY `paragraphKm` JSON NOT NULL;
