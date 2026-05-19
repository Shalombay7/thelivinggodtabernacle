import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BibleService {
  constructor(private prisma: PrismaService) {}

  async getBooks() {
    return this.prisma.bibleBook.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getChapter(bookId: number, chapterNumber: number) {
    const chapter = await this.prisma.bibleChapter.findFirst({
      where: { bookId, number: chapterNumber },
      include: { verses: { orderBy: { number: 'asc' } } },
    });

    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async searchVerses(query: string) {
    return this.prisma.bibleVerse.findMany({
      where: {
        OR: [
          { text: { contains: query } },
          { kjvText: { contains: query } },
        ],
      },
      include: {
        book: true,
      },
      take: 50,
    });
  }
}