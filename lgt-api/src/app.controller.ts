import { Controller, Get, HttpCode, Render } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { homepageContent } from './homepage/homepage.content';
import { aboutPageContent } from './about/about.content';

@ApiTags('root')
@Controller()
export class AppController {
  // About page
  @Get('/about')
  @Render('about')
  @ApiOkResponse({ description: 'About page' })
  getAboutPage() {
    return aboutPageContent;
  }

  // Homepage
  @Get()
  @Render('index')
  @ApiOkResponse({ description: 'Homepage' })
  getHello() {
    return this.getDashboardData();
  }

  // Favicon
  @Get('favicon.ico')
  @HttpCode(204)
  getFavicon() {
    return;
  }

  // JSON dashboard/info endpoint
  @Get('info')
  @ApiOkResponse({ description: 'Returns dashboard data as JSON' })
  getApiInfo() {
    return this.getDashboardData();
  }

  private getDashboardData() {
    return homepageContent;
  }
}