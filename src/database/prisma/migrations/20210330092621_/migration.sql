/*
  Warnings:

  - You are about to drop the column `replyId` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_3`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `replyId`,
    ADD COLUMN     `parentCommentId` INTEGER;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`parentCommentId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
