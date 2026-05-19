import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BibleService } from './bible.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Bible')
@Controller('bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get('books')
  @ApiOperation({ summary: 'List all books in the Bible' })
  getBooks() {
    return this.bibleService.getBooks();
  }

  @Get('books/:bookId/chapters/:chapterNumber')
  @ApiOperation({ summary: 'Get verses for a specific chapter' })
  getChapter(@Param('bookId', ParseIntPipe) bookId: number, @Param('chapterNumber', ParseIntPipe) chapterNumber: number) {
    return this.bibleService.getChapter(bookId, chapterNumber);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for verses by keyword' })
  search(@Query('q') query: string) {
    return this.bibleService.searchVerses(query);
  }
}