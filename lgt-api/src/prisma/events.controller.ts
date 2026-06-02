import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { RSVPStatus } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all upcoming church events' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details for a specific event' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post(':id/rsvp')
  @ApiOperation({ summary: 'Submit an RSVP for an event' })
  rsvp(@Param('id') id: string, @Body() body: { userId: string, status: RSVPStatus }) {
    return this.eventsService.rsvp(id, body.userId, body.status);
  }
}