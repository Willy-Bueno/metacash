-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wallet` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_wallet_key`(`wallet`),
    UNIQUE INDEX `users_id_wallet_key`(`id`, `wallet`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contributions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `owner_wallet` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `hash_tx` VARCHAR(191) NOT NULL,
    `poolId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `chainId` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NOT NULL,
    `endDate` VARCHAR(191) NOT NULL,
    `thumbUri` VARCHAR(191) NOT NULL,
    `thumbKey` VARCHAR(191) NOT NULL,
    `videoUri` VARCHAR(191) NULL,
    `ownerId` INTEGER NOT NULL,
    `goal` INTEGER NOT NULL DEFAULT 0,
    `raisedAmount` DOUBLE NULL DEFAULT 0,
    `status` ENUM('active', 'finished') NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ownerId`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_configs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tax_rate` DOUBLE NOT NULL DEFAULT 0.1,
    `address_default` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `withdraw` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NULL DEFAULT 0,
    `user_id` INTEGER NOT NULL,
    `hash_tx` VARCHAR(191) NULL,
    `status` ENUM('pending', 'success', 'rejected') NOT NULL DEFAULT 'pending',
    `pool_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `withdraw_pool_id_key`(`pool_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contributions` ADD CONSTRAINT `contributions_userId_owner_wallet_fkey` FOREIGN KEY (`userId`, `owner_wallet`) REFERENCES `users`(`id`, `wallet`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contributions` ADD CONSTRAINT `contributions_poolId_fkey` FOREIGN KEY (`poolId`) REFERENCES `pools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pools` ADD CONSTRAINT `pools_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdraw` ADD CONSTRAINT `withdraw_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `withdraw` ADD CONSTRAINT `withdraw_pool_id_fkey` FOREIGN KEY (`pool_id`) REFERENCES `pools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
