import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

jest.mock('./transactions.service', () => ({
  TransactionsService: jest.fn().mockImplementation(() => ({
    getTransactions: jest.fn(),
  })),
}));

const mockedTransactions = [
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

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    (transactionsService.getTransactions as jest.Mock).mockReturnValue(
      mockedTransactions,
    );

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns transactions', () => {
    expect(controller.getBalance()).toEqual(mockedTransactions);
  });

  it('throws if service call fails', () => {
    (transactionsService.getTransactions as jest.Mock).mockImplementation(
      () => {
        throw new Error('Service failure');
      },
    );

    expect(() => controller.getBalance()).toThrow(
      'Fehler beim Abrufen der Transaktionen: Error: Service failure',
    );
  });
});