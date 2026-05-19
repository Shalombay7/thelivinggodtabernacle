import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Sermon, ContentStatus } from '@prisma/client';

@Injectable()
export class SermonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Sermon[]> {
    return this.prisma.sermon.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string): Promise<Sermon | null> {
    return this.prisma.sermon.findUnique({
      where: { id },
    });
  }

  // Admin methods would go here (create, update, delete)
  // Protected by RolesGuard (Admin/Moderator)
}

  async searchSermons(query: string): Promise<Sermon[]> {
    return this.prisma.sermon.findMany({
      where: {
        status: ContentStatus.PUBLISHED,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { preacher: { contains: query, mode: 'insensitive' } },
          { summary: { contains: query, mode: 'insensitive' } },
          { theme: { contains: query, mode: 'insensitive' } },
          // Add more fields to search if needed, e.g., tags (if stored as string[])
        ],
      },
      orderBy: { date: 'desc' },
    });
  }
}