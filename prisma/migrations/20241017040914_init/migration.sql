/*
  Warnings:

  - Added the required column `customerName` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `customerName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_tableNumber_fkey` FOREIGN KEY (`tableNumber`) REFERENCES `Table`(`number`) ON DELETE RESTRICT ON UPDATE CASCADE;
