/*
  Warnings:

  - You are about to drop the `_notificationtouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_notificationtouser` DROP FOREIGN KEY `_notificationtouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_notificationtouser` DROP FOREIGN KEY `_notificationtouser_ibfk_2`;

-- AlterTable
ALTER TABLE `notification` ADD COLUMN     `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_notificationtouser`;

-- AddForeignKey
ALTER TABLE `Notification` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
