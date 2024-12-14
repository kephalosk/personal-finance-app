import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

jest.mock('./app.service', () => ({
  AppService: jest.fn().mockImplementation(() => ({
    isDatabaseHealthy: jest.fn(),
  })),
}));

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    (appService.isDatabaseHealthy as jest.Mock).mockResolvedValue(undefined);

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('returns "Server is reachable and healthy"', async () => {
      expect(await appController.getHealthStatus()).toEqual(
        'Server is reachable and healthy',
      );
    });

    it('throws if service call fails', async () => {
      (appService.isDatabaseHealthy as jest.Mock).mockImplementation(() => {
        throw new Error('Service failure');
      });

      await expect(
        async () => await appController.getHealthStatus(),
      ).rejects.toThrow('Health check failed: Error: Service failure');
    });
  });
});
