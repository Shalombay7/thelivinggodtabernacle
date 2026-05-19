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
      expect(appController.getHello()).toEqual({
        service: 'LGT API',
        status: 'online',
        version: '1.0.0',
        docs: '/docs',
        health: '/api/health',
      });
    });

    it('should allow favicon requests to complete without error', () => {
      expect(appController.getFavicon()).toBeUndefined();
    });
  });
});
