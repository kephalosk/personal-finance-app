import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import * as path from 'node:path';
import * as fs from 'node:fs';

describe('TransactionsService', () => {
  let service: TransactionsService;

  const mockedTransactions = [
    {
      amount: 75.5,
      avatar: '/images/avatars/emma-richardson.jpg',
      category: 'General',
      date: '2024-08-19T14:23:11Z',
      name: 'Emma Richardson',
      recurring: false,
    },
    {
      amount: -55.5,
      avatar: '/images/avatars/savory-bites-bistro.jpg',
      category: 'Dining Out',
      date: '2024-08-19T20:23:11Z',
      name: 'Savory Bites Bistro',
      recurring: false,
    },
  ];

  const mockedTransactionsDTO = {
    transactions: mockedTransactions,
  };

  const mockedTransactionsDTOJson = JSON.stringify(mockedTransactionsDTO);

  beforeEach(async () => {
    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/transactions.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedTransactionsDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns balance', () => {
    expect(service.getTransactions()).toEqual(mockedTransactions);
  });
});
