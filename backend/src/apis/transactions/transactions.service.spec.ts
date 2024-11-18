import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Repository } from 'typeorm';
import { Transactions } from '../../model/entities/Transactions';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: Repository<Transactions>;

  const mockedTransactionsEntity: Transactions[] = [
    {
      id: 1,
      amount: 100,
      avatar: '/images/avatars/emma-richardson.jpg',
      category: 'Dining Out',
      date: '2024-08-19T14:23:11Z',
      name: 'Emma',
      recurring: false,
    },
    {
      id: 2,
      amount: -50,
      avatar: '/images/avatars/savory-bites-bistro.jpg',
      category: 'Entertainment',
      date: '2024-08-19T20:23:11Z',
      name: 'Savory Bites',
      recurring: true,
    },
  ];

  const mockedTransactionsEntityMapped: APITransactionDTO[] = [
    {
      amount: 100,
      avatar: '/images/avatars/emma-richardson.jpg',
      category: 'Dining Out',
      date: '2024-08-19T14:23:11Z',
      name: 'Emma',
      recurring: false,
    },
    {
      amount: -50,
      avatar: '/images/avatars/savory-bites-bistro.jpg',
      category: 'Entertainment',
      date: '2024-08-19T20:23:11Z',
      name: 'Savory Bites',
      recurring: true,
    },
  ];

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
    const mockRepository = {
      find: jest.fn().mockResolvedValue(mockedTransactionsEntity),
    };

    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/transactions.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedTransactionsDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transactions),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get<Repository<Transactions>>(
      getRepositoryToken(Transactions),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns transactions from repository', async () => {
    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedTransactionsEntityMapped);
    expect(result).not.toEqual(mockedTransactions);
  });

  it('returns balance from file if repository fails', async () => {
    jest
      .spyOn(repository, 'find')
      .mockRejectedValue(new Error('Database error'));

    const result = await service.findAll();

    expect(result).toEqual(mockedTransactions);
    expect(result).not.toEqual(mockedTransactionsEntityMapped);
  });
});
