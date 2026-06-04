import { Controller, Get, HttpCode, Render } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
    return {
      service: 'The Living God Tabernacle',
      vision:
        'A welcoming home for worship, discipleship, prayer, and transformed lives.',
      about: {
        mission:
          'To raise wholehearted believers who know Christ, live His Word, and shine His love in every generation.',
        statementOfFaith:
          'We believe in salvation through Jesus Christ, the authority of Scripture, the power of prayer, and the work of the Holy Spirit in the Church.',
        liveNow: false,
      },
      churchInfo: {
        address: 'Accra, Ghana',
        serviceTime:
          'Sunday Worship at 8:00 AM and Wednesday Bible Study at 6:00 PM',
        contact: 'connect@thelivinggodtabernacle.org',
        socialLinks: {
          facebook: 'https://facebook.com',
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com',
        },
        givingUrl: '#connect',
      },
      leadership: {
        pastor: 'The Living God Tabernacle Leadership',
        message:
          'You belong here. We are building a Christ-centered family where children, youth, adults, and new believers can grow with confidence and hope.',
        image: '',
      },
      modules: [
        {
          id: 'altar',
          name: 'Daily Manna',
          active: true,
          for: 'All believers',
        },
        {
          id: 'explorers',
          name: 'Kingdom Explorers',
          active: true,
          for: 'Children',
        },
        { id: 'regen', name: 'Re-Gen Hub', active: true, for: 'Youth' },
        { id: 'fellowship', name: 'LifeCircles', active: true, for: 'Adults' },
        { id: 'prayer', name: 'Prayer Wall', active: true, for: 'Community' },
        {
          id: 'events',
          name: 'Upcoming Events',
          active: true,
          for: 'Everyone',
        },
      ],
      links: {
        docs: '/docs',
        health: '/api/health',
        portal: '/',
      },
    };
  }
}
