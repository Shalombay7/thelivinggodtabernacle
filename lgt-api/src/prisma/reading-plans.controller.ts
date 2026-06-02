import { Controller, Get, Param } from '@nestjs/common';
import { ReadingPlansService } from './reading-plans.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reading Plans')
@Controller('reading-plans')
export class ReadingPlansController {
  constructor(private readonly readingPlansService: ReadingPlansService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available reading plans' })
  findAll() {
    return this.readingPlansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific plan with all daily tasks' })
  findOne(@Param('id') id: string) {
    return this.readingPlansService.findOne(id);
  }
}