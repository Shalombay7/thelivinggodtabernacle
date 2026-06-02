import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReadingPlansService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.readingPlan.findMany({
      include: {
        _count: { select: { items: true } }
      }
    });
  }

  async findOne(id: string) {
    const plan = await this.prisma.readingPlan.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { dayNumber: 'asc' }
        }
      }
    });
    if (!plan) throw new NotFoundException('Reading plan not found');
    return plan;
  }
}