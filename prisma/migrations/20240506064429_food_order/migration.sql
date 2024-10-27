/*
  Warnings:

  - You are about to alter the column `order_date` on the `order_list` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `order_list` MODIFY `order_date` VARCHAR(191) NOT NULL DEFAULT '';
