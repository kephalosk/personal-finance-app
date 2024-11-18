import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

jest.mock('./balance.service', () => ({
  BalanceService: jest.fn().mockImplementation(() => ({
    findBalance: jest.fn(),
  })),
}));

const mockedBalance = {
  current: 1000,
  income: 5000,
  expenses: 2000,
};

describe('BalanceController', () => {
  let controller: BalanceController;
  let balanceService: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [BalanceService],
    }).compile();

    balanceService = module.get<BalanceService>(BalanceService);
    (balanceService.findBalance as jest.Mock).mockResolvedValue(mockedBalance);

    controller = module.get<BalanceController>(BalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns balance', async () => {
    const result = await controller.getBalance();

    expect(result).toEqual(mockedBalance);
  });

  it('throws if service call fails', async () => {
    (balanceService.findBalance as jest.Mock).mockImplementation(() => {
      throw new Error('Service failure');
    });

    await expect(() => controller.getBalance()).rejects.toThrow(
      'Fehler beim Abrufen des Kontostands: Error: Service failure',
    );
  });
});
