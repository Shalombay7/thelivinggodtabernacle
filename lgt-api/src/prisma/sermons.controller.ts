import { Controller, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Sermons')
@Controller('sermons')
export class SermonsController {
  constructor(private readonly sermonsService: SermonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published sermons' })
  async findAll() {
    return this.sermonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sermon details by ID' })
  async findOne(@Param('id') id: string) {
    const sermon = await this.sermonsService.findOne(id);
    if (!sermon) throw new NotFoundException('Sermon not found');
    return sermon;
  }

  @Get('search')
  @ApiOperation({ summary: 'Search sermons by keyword' })
  @ApiQuery({ name: 'q', required: true, description: 'Search query string' })
  async search(@Query('q') query: string) {
    return this.sermonsService.searchSermons(query);
  }
}