import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';

jest.mock('./transactions.service', (): { TransactionsService: jest.Mock } => ({
  TransactionsService: jest
    .fn()
    .mockImplementation((): { findAll: jest.Mock } => ({
      findAll: jest.fn(),
    })),
}));

const mockedTransactions: APITransactionDTO[] = [
  {
    avatar: '/images/avatars/emma-richardson.jpg',
    name: 'Emma Richardson',
    category: 'General',
    date: '2024-08-19T14:23:11Z',
    amount: 75.5,
    recurring: false,
  },
  {
    avatar: '/images/avatars/savory-bites-bistro.jpg',
    name: 'Savory Bites Bistro',
    category: 'Dining Out',
    date: '2024-08-19T20:23:11Z',
    amount: -55.5,
    recurring: false,
  },
];

describe('TransactionsController', (): void => {
  let controller: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    (transactionsService.findAll as jest.Mock).mockResolvedValue(
      mockedTransactions,
    );

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('is defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('returns transactions', async (): Promise<void> => {
    const result: APITransactionDTO[] = await controller.getBalance();

    expect(result).toEqual(mockedTransactions);
  });

  it('throws if service call fails', async (): Promise<void> => {
    (transactionsService.findAll as jest.Mock).mockImplementation(() => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<APITransactionDTO[]> => controller.getBalance(),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<APITransactionDTO[]> => controller.getBalance(),
    ).rejects.toThrow(
      'Error while retrieving transactions from database: Service failure',
    );
  });

  it('throws if transactions not found', async (): Promise<void> => {
    (transactionsService.findAll as jest.Mock).mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<APITransactionDTO[]> => controller.getBalance(),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<APITransactionDTO[]> => controller.getBalance(),
    ).rejects.toThrow('Transactions not found.');
  });
});
