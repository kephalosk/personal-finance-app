import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

jest.mock('./balance.service', () => ({
  BalanceService: jest.fn().mockImplementation(() => ({
    getBalance: jest.fn(),
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
    (balanceService.getBalance as jest.Mock).mockReturnValue(mockedBalance);

    controller = module.get<BalanceController>(BalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns balance', () => {
    expect(controller.getBalance()).toEqual(mockedBalance);
  });

  it('throws if service call fails', () => {
    (balanceService.getBalance as jest.Mock).mockImplementation(() => {
      throw new Error('Service failure');
    });

    expect(() => controller.getBalance()).toThrow(
      'Fehler beim Abrufen des Kontostands: Error: Service failure',
    );
  });
});
