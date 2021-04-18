/*
  Warnings:

  - You are about to drop the column `parentPost` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `_replycomments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_replycomments` DROP FOREIGN KEY `_replycomments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_replycomments` DROP FOREIGN KEY `_replycomments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_2`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN     `replyId` INTEGER;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `parentPost`,
    ADD COLUMN     `parentPostId` INTEGER;

-- DropTable
DROP TABLE `_replycomments`;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`replyId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`parentPostId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
