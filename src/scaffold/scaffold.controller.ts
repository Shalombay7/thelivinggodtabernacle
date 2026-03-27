import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScaffoldService } from './scaffold.service';

@ApiTags('scaffold')
@Controller('scaffold')
export class ScaffoldController {
  constructor(private readonly scaffoldService: ScaffoldService) {}

  @Get()
  @ApiOkResponse({ description: 'Route and component scaffold for the app' })
  getManifest() {
    return this.scaffoldService.getManifest();
  }
}
