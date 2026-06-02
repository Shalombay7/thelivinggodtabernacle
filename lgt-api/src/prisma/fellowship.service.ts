import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class FellowshipService {
  constructor(private prisma: PrismaService) {}

  async findAllGroups() {
    return this.prisma.fellowshipGroup.findMany({
      include: {
        _count: { select: { members: true } },
      },
    });
  }

  async joinGroup(groupId: string, userId: string) {
    return this.prisma.fellowshipMember.create({
      data: {
        groupId,
        userId,
        role: 'member',
      },
    });
  }

  async getGroupPosts(groupId: string) {
    return this.prisma.groupPost.findMany({
      where: { groupId },
      include: { user: { select: { name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPost(groupId: string, userId: string, body: string) {
    return this.prisma.groupPost.create({
      data: { groupId, userId, body },
    });
  }
}