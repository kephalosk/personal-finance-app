import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceUnavailableException } from '@nestjs/common';

jest.mock('./app.service', (): { AppService: jest.Mock } => ({
  AppService: jest
    .fn()
    .mockImplementation((): { isDatabaseHealthy: jest.Mock } => ({
      isDatabaseHealthy: jest.fn(),
    })),
}));

describe('AppController', (): void => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async (): Promise<void> => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    (appService.isDatabaseHealthy as jest.Mock).mockResolvedValue(undefined);

    appController = app.get<AppController>(AppController);
  });

  describe('root', (): void => {
    it('returns "Server is reachable and healthy"', async () => {
      expect(await appController.getHealthStatus()).toEqual(
        'Server is reachable and healthy',
      );
    });

    it('throws if service call fails', async (): Promise<void> => {
      (appService.isDatabaseHealthy as jest.Mock).mockImplementation(() => {
        throw new Error('Service failure');
      });

      await expect(
        async (): Promise<string> => await appController.getHealthStatus(),
      ).rejects.toThrow('Health check failed: Error: Service failure');
    });

    it('throws if database connection fails', async (): Promise<void> => {
      (appService.isDatabaseHealthy as jest.Mock).mockImplementation(
        (): void => {
          throw new ServiceUnavailableException('Connection failed');
        },
      );

      await expect(
        async (): Promise<string> => await appController.getHealthStatus(),
      ).rejects.toThrow(ServiceUnavailableException);
      await expect(
        async (): Promise<string> => await appController.getHealthStatus(),
      ).rejects.toThrow('Database connection error: Connection failed');
    });
  });
});
