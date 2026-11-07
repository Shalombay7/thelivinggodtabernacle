import { Controller, Get, HttpCode, NotFoundException, Render, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { homepageContent } from './homepage/homepage.content';
import { aboutPageContent } from './about/about.content';
import { legacyPagesBySlug, legacyPathAliases } from './legacy/legacy.content';

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

  @Get([
    'message',
    'services',
    'resources',
    'sermons',
    'teachings',
    'hymns',
    'videos',
    'gallery',
    'questions',
    'prayer',
    'radio',
  ])
  @Render('legacy-page')
  @ApiOkResponse({ description: 'Legacy app page' })
  getLegacyPage(@Req() request: { path?: string; url: string }) {
    const routeSlug = this.getRoutePath(request);
    const page = legacyPagesBySlug.get(routeSlug);

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  @Get([
    'malachi-4-5-6',
    'malachi-4-5-6/audio-sermons-2',
    'did-you-know',
    'malachi-4-5-6/hymns',
    'malachi-4-5-6/hymns/01-2',
    'malachi-4-5-6/videos',
    'malachi-4-5-6/gallery',
    'elementor-landing-page-3362',
    'malachi-4-5-6/prayer-requests-and-testimonies',
    'q-a002',
    'dear-brother-branham-if-a-baby-is-born-of-a-out-of-wedlock-can-this-child-ever-be-saved-or-go-in-the-rapture',
    'how-can-a-person-have-their-name-on-the-book-of-life-and-still-be-lost',
    'how-does-one-know-their-rightful-position-in-the-body-of-christ',
  ])
  @Render('legacy-page')
  @ApiOkResponse({ description: 'Legacy URL app page' })
  getLegacyAlias(@Req() request: { path?: string; url: string }) {
    const aliasPath = this.getRoutePath(request);
    const slug = legacyPathAliases.get(aliasPath);
    const page = slug ? legacyPagesBySlug.get(slug) : undefined;

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
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

  private getRoutePath(request: { path?: string; url: string }) {
    return (request.path ?? request.url).replace(/^\/+|\/+$/g, '');
  }
}
