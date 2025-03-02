import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Repository } from 'typeorm';
import { Transactions } from '../../model/entities/Transactions';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';

jest.spyOn(console, 'error').mockImplementation((): void => null);

describe('TransactionsService', (): void => {
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

  const mockedTransactions: APITransactionDTO[] = [
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

  beforeEach(async (): Promise<void> => {
    const mockRepository: { find: jest.Mock } = {
      find: jest.fn().mockResolvedValue(mockedTransactionsEntity),
    };

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

  it('is defined', (): void => {
    expect(service).toBeDefined();
  });

  it('returns transactions from repository', async (): Promise<void> => {
    const result: APITransactionDTO[] = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedTransactionsEntityMapped);
    expect(result).not.toEqual(mockedTransactions);
  });

  it('throws if balance is not found', async (): Promise<void> => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(
      (): Promise<APITransactionDTO[]> => service.findAll(),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<APITransactionDTO[]> => service.findAll(),
    ).rejects.toThrow('No transactions found.');
  });

  it('throws if database connection fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'find')
      .mockImplementation((): Promise<Transactions[]> => {
        throw new ServiceUnavailableException('Connection failed');
      });

    await expect(
      (): Promise<APITransactionDTO[]> => service.findAll(),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<APITransactionDTO[]> => service.findAll(),
    ).rejects.toThrow('Connection failed');
  });
});
