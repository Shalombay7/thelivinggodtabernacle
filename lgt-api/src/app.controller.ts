import { Controller, Get, HttpCode, Render } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { homepageContent } from './homepage/homepage.content';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @Render('index')
  @ApiOkResponse({ description: 'Basic hello response' })
  getHello() {
    return this.getDashboardData();
  }

  @Get('favicon.ico')
  @HttpCode(204)
  getFavicon() {
    return;
  }

  @Get('info')
  @ApiOkResponse({ description: 'Returns dashboard data as JSON' })
  getApiInfo() {
    return this.getDashboardData();
  }

  private getDashboardData() {
    return homepageContent;
  }
}
