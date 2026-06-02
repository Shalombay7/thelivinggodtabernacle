import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ContentType } from '@prisma/client';

@Injectable()
export class PersonalizationService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
    });
  }

  async addBookmark(userId: string, contentType: ContentType, contentId: string) {
    return this.prisma.bookmark.upsert({
      where: {
        userId_contentType_contentId: { userId, contentType, contentId },
      },
      create: { userId, contentType, contentId },
      update: {},
    });
  }

  async getNotes(userId: string) {
    return this.prisma.note.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async upsertNote(userId: string, data: { contentType: ContentType; contentId: string; body: string }) {
    return this.prisma.note.create({
      data: {
        userId,
        contentType: data.contentType,
        contentId: data.contentId,
        body: data.body,
      },
    });
  }
}