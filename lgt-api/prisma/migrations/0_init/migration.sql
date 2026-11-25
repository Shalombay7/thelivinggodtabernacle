-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NULL,
    `role` ENUM('MEMBER', 'MODERATOR', 'ADMIN') NOT NULL DEFAULT 'MEMBER',
    `avatarUrl` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `churchName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BibleBook` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shortName` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `testament` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BibleBook_name_key`(`name`),
    UNIQUE INDEX `BibleBook_shortName_key`(`shortName`),
    UNIQUE INDEX `BibleBook_order_key`(`order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BibleChapter` (
    `id` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `chapterNumber` INTEGER NOT NULL,
    `verseCount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `BibleChapter_bookId_idx`(`bookId`),
    UNIQUE INDEX `BibleChapter_bookId_chapterNumber_key`(`bookId`, `chapterNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BibleVerse` (
    `id` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `chapterId` VARCHAR(191) NOT NULL,
    `verseNumber` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `kjvText` VARCHAR(191) NOT NULL,
    `crossReferences` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `BibleVerse_bookId_idx`(`bookId`),
    INDEX `BibleVerse_chapterId_idx`(`chapterId`),
    UNIQUE INDEX `BibleVerse_chapterId_verseNumber_key`(`chapterId`, `verseNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sermon` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `preacherName` VARCHAR(191) NOT NULL DEFAULT 'William Marrion Branham',
    `datePreached` DATETIME(3) NOT NULL,
    `audioUrl` VARCHAR(191) NULL,
    `transcript` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NULL,
    `theme` VARCHAR(191) NULL,
    `tags` JSON NULL,
    `scriptureReferences` JSON NULL,
    `seriesName` VARCHAR(191) NULL,
    `duration` INTEGER NULL,
    `language` ENUM('ENGLISH', 'OTHER') NOT NULL DEFAULT 'ENGLISH',
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `sourceUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Sermon_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SermonTopic` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SermonTopic_name_key`(`name`),
    UNIQUE INDEX `SermonTopic_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SermonTopicMap` (
    `sermonId` VARCHAR(191) NOT NULL,
    `topicId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `SermonTopicMap_topicId_idx`(`topicId`),
    PRIMARY KEY (`sermonId`, `topicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReadingPlan` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` ENUM('BIBLE', 'SERMON', 'COMBINED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReadingPlanItem` (
    `id` VARCHAR(191) NOT NULL,
    `planId` VARCHAR(191) NOT NULL,
    `dayNumber` INTEGER NOT NULL,
    `orderIndex` INTEGER NOT NULL DEFAULT 0,
    `contentType` ENUM('BIBLE', 'SERMON', 'PRAYER_REQUEST', 'TESTIMONY', 'EVENT', 'GROUP_POST', 'ANNOUNCEMENT', 'LOCATION', 'DOWNLOAD') NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ReadingPlanItem_planId_idx`(`planId`),
    INDEX `ReadingPlanItem_contentType_contentId_idx`(`contentType`, `contentId`),
    UNIQUE INDEX `ReadingPlanItem_planId_dayNumber_orderIndex_key`(`planId`, `dayNumber`, `orderIndex`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmark` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contentType` ENUM('BIBLE', 'SERMON', 'PRAYER_REQUEST', 'TESTIMONY', 'EVENT', 'GROUP_POST', 'ANNOUNCEMENT', 'LOCATION', 'DOWNLOAD') NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Bookmark_contentType_contentId_idx`(`contentType`, `contentId`),
    UNIQUE INDEX `Bookmark_userId_contentType_contentId_key`(`userId`, `contentType`, `contentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contentType` ENUM('BIBLE', 'SERMON', 'PRAYER_REQUEST', 'TESTIMONY', 'EVENT', 'GROUP_POST', 'ANNOUNCEMENT', 'LOCATION', 'DOWNLOAD') NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `verseRange` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Note_userId_contentType_idx`(`userId`, `contentType`),
    INDEX `Note_contentType_contentId_idx`(`contentType`, `contentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Highlight` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contentType` ENUM('BIBLE', 'SERMON', 'PRAYER_REQUEST', 'TESTIMONY', 'EVENT', 'GROUP_POST', 'ANNOUNCEMENT', 'LOCATION', 'DOWNLOAD') NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `selectedText` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Highlight_userId_contentType_idx`(`userId`, `contentType`),
    INDEX `Highlight_contentType_contentId_idx`(`contentType`, `contentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrayerRequest` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `status` ENUM('OPEN', 'ANSWERED', 'HIDDEN') NOT NULL DEFAULT 'OPEN',
    `isAnonymous` BOOLEAN NOT NULL DEFAULT false,
    `prayCount` INTEGER NOT NULL DEFAULT 0,
    `answeredAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PrayerRequest_status_idx`(`status`),
    INDEX `PrayerRequest_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrayerResponse` (
    `id` VARCHAR(191) NOT NULL,
    `requestId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `body` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PrayerResponse_requestId_idx`(`requestId`),
    INDEX `PrayerResponse_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimony` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'PUBLISHED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Testimony_status_idx`(`status`),
    INDEX `Testimony_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FellowshipGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `region` VARCHAR(191) NULL,
    `type` ENUM('LOCAL', 'STUDY', 'PRAYER', 'DISCUSSION') NOT NULL,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FellowshipGroup_slug_key`(`slug`),
    INDEX `FellowshipGroup_type_idx`(`type`),
    INDEX `FellowshipGroup_region_idx`(`region`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FellowshipMember` (
    `id` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'member',
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FellowshipMember_userId_idx`(`userId`),
    UNIQUE INDEX `FellowshipMember_groupId_userId_key`(`groupId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupPost` (
    `id` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `GroupPost_groupId_idx`(`groupId`),
    INDEX `GroupPost_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `eventType` VARCHAR(191) NOT NULL,
    `status` ENUM('UPCOMING', 'LIVE', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'UPCOMING',
    `startsAt` DATETIME(3) NOT NULL,
    `endsAt` DATETIME(3) NULL,
    `locationName` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `isLivestream` BOOLEAN NOT NULL DEFAULT false,
    `streamUrl` VARCHAR(191) NULL,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Event_slug_key`(`slug`),
    INDEX `Event_status_idx`(`status`),
    INDEX `Event_startsAt_idx`(`startsAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventRsvp` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('GOING', 'INTERESTED', 'NOT_GOING') NOT NULL DEFAULT 'GOING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `EventRsvp_userId_idx`(`userId`),
    UNIQUE INDEX `EventRsvp_eventId_userId_key`(`eventId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('ASSEMBLY', 'HOUSE_FELLOWSHIP', 'MINISTER') NOT NULL,
    `region` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `serviceTimes` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Location_type_idx`(`type`),
    INDEX `Location_region_idx`(`region`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Download` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `contentType` ENUM('BIBLE', 'SERMON', 'PRAYER_REQUEST', 'TESTIMONY', 'EVENT', 'GROUP_POST', 'ANNOUNCEMENT', 'LOCATION', 'DOWNLOAD') NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `downloadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Download_contentType_contentId_idx`(`contentType`, `contentId`),
    UNIQUE INDEX `Download_userId_contentType_contentId_key`(`userId`, `contentType`, `contentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `audience` VARCHAR(191) NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Announcement_publishedAt_idx`(`publishedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModerationQueue` (
    `id` VARCHAR(191) NOT NULL,
    `itemType` ENUM('BIBLE', 'SERMON', 'PRAYER_REQUEST', 'TESTIMONY', 'EVENT', 'GROUP_POST', 'ANNOUNCEMENT', 'LOCATION', 'DOWNLOAD') NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `reason` VARCHAR(191) NULL,
    `moderatedById` VARCHAR(191) NULL,
    `moderatedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ModerationQueue_itemType_itemId_idx`(`itemType`, `itemId`),
    INDEX `ModerationQueue_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BibleChapter` ADD CONSTRAINT `BibleChapter_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `BibleBook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BibleVerse` ADD CONSTRAINT `BibleVerse_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `BibleBook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BibleVerse` ADD CONSTRAINT `BibleVerse_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `BibleChapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SermonTopicMap` ADD CONSTRAINT `SermonTopicMap_sermonId_fkey` FOREIGN KEY (`sermonId`) REFERENCES `Sermon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SermonTopicMap` ADD CONSTRAINT `SermonTopicMap_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `SermonTopic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReadingPlanItem` ADD CONSTRAINT `ReadingPlanItem_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `ReadingPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Highlight` ADD CONSTRAINT `Highlight_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrayerRequest` ADD CONSTRAINT `PrayerRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrayerResponse` ADD CONSTRAINT `PrayerResponse_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `PrayerRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrayerResponse` ADD CONSTRAINT `PrayerResponse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Testimony` ADD CONSTRAINT `Testimony_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FellowshipGroup` ADD CONSTRAINT `FellowshipGroup_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FellowshipMember` ADD CONSTRAINT `FellowshipMember_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `FellowshipGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FellowshipMember` ADD CONSTRAINT `FellowshipMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupPost` ADD CONSTRAINT `GroupPost_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `FellowshipGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupPost` ADD CONSTRAINT `GroupPost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventRsvp` ADD CONSTRAINT `EventRsvp_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventRsvp` ADD CONSTRAINT `EventRsvp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Download` ADD CONSTRAINT `Download_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModerationQueue` ADD CONSTRAINT `ModerationQueue_moderatedById_fkey` FOREIGN KEY (`moderatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
