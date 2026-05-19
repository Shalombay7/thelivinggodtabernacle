import { Controller, Get, Render } from '@nestjs/common';
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

  @Get('info')
  @ApiOkResponse({ description: 'Returns dashboard data as JSON' })
  getApiInfo() {
    return this.getDashboardData();
  }

  private getDashboardData() {
    return {
      service: 'LGT API',
      vision: 'Kingdom Link 1.0',
      about: {
        mission: 'To exalt the Living God, equip the saints, and evangelize the world.',
        statementOfFaith: 'We believe in the Holy Trinity, the infallible Word of God, and the power of fellowship.',
        liveNow: false,
      },
      churchInfo: {
        address: '123 Tabernacle Way, Faith City',
        serviceTime: 'Sundays at 10:00 AM',
        contact: 'connect@thelivinggodtabernacle.org',
        socialLinks: {
          facebook: 'https://facebook.com/lgt',
          youtube: 'https://youtube.com/lgt',
          instagram: 'https://instagram.com/lgt'
        },
        givingUrl: '/api/give'
      },
      leadership: {
        pastor: 'Pastor John Doe',
        message: 'Welcome to our digital sanctuary. We are here to grow together in Christ.',
        image: '/pastor.jpg'
      },
      modules: [
        { id: 'altar', name: 'Daily Manna', active: true, for: 'All' },
        { id: 'explorers', name: 'Kingdom Explorers', active: true, for: 'Children' },
        { id: 'regen', name: 'Re-Gen Hub', active: true, for: 'Youth' },
        { id: 'fellowship', name: 'LifeCircles', active: true, for: 'Adults' },
        { id: 'media', name: 'Media Center', active: true, for: 'Everyone' },
        { id: 'prayer', name: 'Prayer Wall', active: true, for: 'Community' },
        { id: 'events', name: 'Upcoming Events', active: true, for: 'Everyone' },
        { id: 'ministries', name: 'Specialized Ministries', active: false, for: 'Men & Women' }
      ],
      links: {
        docs: '/docs',
        health: '/api/health',
        portal: '/'
      }
    };
  }
}
