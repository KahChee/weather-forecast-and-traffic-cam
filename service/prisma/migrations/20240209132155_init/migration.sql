-- CreateTable
CREATE TABLE `SearchHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `searchTimestamp` INTEGER NOT NULL,
    `location` JSON NOT NULL,
    `createdAt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
