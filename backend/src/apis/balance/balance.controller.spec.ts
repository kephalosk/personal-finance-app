import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';

jest.mock('./balance.service', (): { BalanceService: jest.Mock } => ({
  BalanceService: jest
    .fn()
    .mockImplementation((): { findBalance: jest.Mock } => ({
      findBalance: jest.fn(),
    })),
}));

const mockedBalance: APIBalanceDTO = {
  current: 1000,
  income: 5000,
  expenses: 2000,
};

describe('BalanceController', (): void => {
  let balanceService: BalanceService;
  let controller: BalanceController;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [BalanceService],
    }).compile();

    balanceService = module.get<BalanceService>(BalanceService);
    (balanceService.findBalance as jest.Mock).mockResolvedValue(mockedBalance);

    controller = module.get<BalanceController>(BalanceController);
  });

  it('is defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('returns balance', async (): Promise<void> => {
    const result: APIBalanceDTO = await controller.getBalance();

    expect(result).toEqual(mockedBalance);
  });

  it('throws if service call fails', async (): Promise<void> => {
    (balanceService.findBalance as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<APIBalanceDTO> => controller.getBalance(),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<APIBalanceDTO> => controller.getBalance(),
    ).rejects.toThrow(
      'Error while retrieving balances from database: Service failure',
    );
  });

  it('throws if balances not found', async (): Promise<void> => {
    (balanceService.findBalance as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<APIBalanceDTO> => controller.getBalance(),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<APIBalanceDTO> => controller.getBalance(),
    ).rejects.toThrow('Balances not found.');
  });
});
