import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventStatus, RsvpStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      where: { status: EventStatus.UPCOMING },
      orderBy: { startsAt: 'asc' },
      include: {
        _count: { select: { rsvps: true } }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: { rsvps: true }
    });
  }

  async rsvp(eventId: string, userId: string, status: RsvpStatus) {
    return this.prisma.eventRSVP.upsert({
      where: {
        eventId_userId: { eventId, userId }
      },
      update: { status },
      create: {
        userId,
        eventId,
        status,
      },
    });
  }
}