import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';

jest.mock('./budget.service', () => ({
  BudgetService: jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
    addNewBudget: jest.fn(),
    updateBudget: jest.fn(),
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
    (budgetService.addNewBudget as jest.Mock).mockResolvedValue(undefined);
    (budgetService.updateBudget as jest.Mock).mockResolvedValue(undefined);

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

  it('adds new budget', async () => {
    const result = await controller.addNewBudget(mockedBudgets[0]);

    expect(result).toBeUndefined();
    expect(budgetService.addNewBudget).toHaveBeenCalledWith(mockedBudgets[0]);
  });

  it('throws if addNewBudget call fails', async () => {
    (budgetService.addNewBudget as jest.Mock).mockImplementation(() => {
      throw new Error('Service failure');
    });

    await expect(() =>
      controller.addNewBudget(mockedBudgets[0]),
    ).rejects.toThrow(
      'Fehler beim Anlegen des neuen Budgets: Error: Service failure',
    );
  });

  it('updates a budget', async () => {
    const result = await controller.editBudget(mockedBudgets[0]);

    expect(result).toBeUndefined();
    expect(budgetService.updateBudget).toHaveBeenCalledWith(mockedBudgets[0]);
  });

  it('throws if editBudget call fails', async () => {
    (budgetService.updateBudget as jest.Mock).mockImplementation(() => {
      throw new Error('Service failure');
    });

    await expect(() => controller.editBudget(mockedBudgets[0])).rejects.toThrow(
      'Fehler beim Bearbeiten des Budgets: Error: Service failure',
    );
  });
});
