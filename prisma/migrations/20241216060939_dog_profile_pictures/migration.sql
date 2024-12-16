/*
  Warnings:

  - You are about to drop the `DogProfilePictires` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `DogProfilePictires` DROP FOREIGN KEY `DogProfilePictires_user_id_fkey`;

-- DropTable
DROP TABLE `DogProfilePictires`;

-- CreateTable
CREATE TABLE `DogProfilePictures` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DogProfilePictures` ADD CONSTRAINT `DogProfilePictures_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
