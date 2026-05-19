import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return service metadata', () => {
      expect(appController.getHello()).toMatchObject({
        service: 'The Living God Tabernacle',
        vision:
          'A welcoming home for worship, discipleship, prayer, and transformed lives.',
        links: {
          docs: '/docs',
          health: '/api/health',
          portal: '/',
        },
      });
    });

    it('should allow favicon requests to complete without error', () => {
      expect(appController.getFavicon()).toBeUndefined();
    });
  });
});
