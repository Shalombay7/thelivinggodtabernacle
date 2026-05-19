import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ContentStatus } from '@prisma/client';

@Injectable()
export class TestimoniesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string; userId: string }) {
    return this.prisma.testimony.create({
      data: {
        ...data,
        status: ContentStatus.PENDING,
      },
    });
  }

  async findAllPublished() {
    return this.prisma.testimony.findMany({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true } }
      }
    });
  }

  async updateStatus(id: string, status: ContentStatus) {
    return this.prisma.testimony.update({
      where: { id },
      data: { status },
    });
  }
}