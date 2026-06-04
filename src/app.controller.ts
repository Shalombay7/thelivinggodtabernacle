import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Basic hello response' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('favicon.ico')
  @HttpCode(204)
  getFavicon(): void {
    return;
  }
}
