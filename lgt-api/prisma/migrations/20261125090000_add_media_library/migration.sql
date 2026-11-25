-- Additive media-library tables. Existing application tables and rows are untouched.
CREATE TABLE `MediaAsset` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `kind` ENUM('AUDIO', 'VIDEO', 'IMAGE') NOT NULL,
  `mimeType` VARCHAR(191) NOT NULL,
  `size` INTEGER NOT NULL,
  `storageKey` VARCHAR(191) NOT NULL,
  `url` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `MediaAsset_storageKey_key` (`storageKey`),
  INDEX `MediaAsset_kind_idx` (`kind`),
  INDEX `MediaAsset_createdAt_idx` (`createdAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `MediaPlaylist` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `year` INTEGER NULL,
  `description` TEXT NOT NULL,
  `replaceExisting` BOOLEAN NOT NULL DEFAULT false,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  UNIQUE INDEX `MediaPlaylist_slug_key` (`slug`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `PlaylistMedia` (
  `playlistId` VARCHAR(191) NOT NULL,
  `mediaId` VARCHAR(191) NOT NULL,
  `orderIndex` INTEGER NOT NULL DEFAULT 0,
  UNIQUE INDEX `PlaylistMedia_playlistId_orderIndex_key` (`playlistId`, `orderIndex`),
  INDEX `PlaylistMedia_mediaId_idx` (`mediaId`),
  PRIMARY KEY (`playlistId`, `mediaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `PlaylistMedia` ADD CONSTRAINT `PlaylistMedia_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `MediaPlaylist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `PlaylistMedia` ADD CONSTRAINT `PlaylistMedia_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `MediaAsset` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
