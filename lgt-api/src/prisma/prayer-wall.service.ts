import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContentStatus } from '@prisma/client';

@Injectable()
export class PrayerWallService {
  constructor(private prisma: PrismaService) {}

  async createRequest(content: string, isAnonymous: boolean, userId?: string) {
    return this.prisma.prayerRequest.create({
      data: {
        content,
        isAnonymous,
        userId,
        status: ContentStatus.PENDING,
      },
    });
  }

  async getActiveRequests() {
    return this.prisma.prayerRequest.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addPrayCount(id: string) {
    return this.prisma.prayerRequest.update({
      where: { id },
      data: { prayCount: { increment: 1 } },
    });
  }

  async findAllForModeration() {
    return this.prisma.prayerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: ContentStatus) {
    return this.prisma.prayerRequest.update({
      where: { id },
      data: { status },
    });
  }
}