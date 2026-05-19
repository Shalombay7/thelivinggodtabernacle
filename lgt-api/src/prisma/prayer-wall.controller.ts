import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { PrayerWallService } from './prayer-wall.service';
import { ContentStatus } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Prayer Wall')
@Controller('prayer-requests')
export class PrayerWallController {
  constructor(private readonly prayerWallService: PrayerWallService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published prayer requests' })
  findAll() {
    return this.prayerWallService.getActiveRequests();
  }

  @Post()
  @ApiOperation({ summary: 'Submit a new prayer request' })
  create(@Body() body: { content: string; isAnonymous: boolean; userId?: string }) {
    return this.prayerWallService.createRequest(body.content, body.isAnonymous, body.userId);
  }

  @Patch(':id/pray')
  @ApiOperation({ summary: 'Increment the pray count for a request' })
  addPray(@Param('id') id: string) {
    return this.prayerWallService.addPrayCount(id);
  }

  @Get('admin')
  @ApiOperation({ summary: 'Get all prayer requests for moderation' })
  findAllAdmin() {
    return this.prayerWallService.findAllForModeration();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update prayer request status' })
  updateStatus(@Param('id') id: string, @Body('status') status: ContentStatus) {
    return this.prayerWallService.updateStatus(id, status);
  }
}