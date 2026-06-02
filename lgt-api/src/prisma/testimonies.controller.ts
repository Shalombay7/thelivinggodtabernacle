import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TestimoniesService } from './testimonies.service';
import { ContentStatus } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Testimonies')
@Controller('testimonies')
export class TestimoniesController {
  constructor(private readonly testimoniesService: TestimoniesService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new testimony' })
  create(@Body() body: { title: string; content: string; userId: string }) {
    return this.testimoniesService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all published testimonies' })
  findAll() {
    return this.testimoniesService.findAllPublished();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update testimony status (Moderation)' })
  updateStatus(@Param('id') id: string, @Body('status') status: ContentStatus) {
    return this.testimoniesService.updateStatus(id, status);
  }
}