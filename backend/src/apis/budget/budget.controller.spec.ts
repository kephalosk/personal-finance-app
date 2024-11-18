import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';

jest.mock('./budget.service', () => ({
  BudgetService: jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
  })),
}));

const mockedBudgets = [
  {
    category: 'Entertainment',
    maximum: 50.0,
    theme: '#277C78',
  },
  {
    category: 'Bills',
    maximum: 750.0,
    theme: '#82C9D7',
  },
];

describe('BudgetController', () => {
  let controller: BudgetController;
  let budgetService: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [BudgetService],
    }).compile();

    budgetService = module.get<BudgetService>(BudgetService);
    (budgetService.findAll as jest.Mock).mockResolvedValue(mockedBudgets);

    controller = module.get<BudgetController>(BudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns budgets', async () => {
    const result = await controller.getBudget();

    expect(result).toEqual(mockedBudgets);
  });

  it('throws if service call fails', async () => {
    (budgetService.findAll as jest.Mock).mockImplementation(() => {
      throw new Error('Service failure');
    });

    await expect(() => controller.getBudget()).rejects.toThrow(
      'Fehler beim Abrufen der Budgets: Error: Service failure',
    );
  });
});
