import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';
import * as path from 'node:path';
import * as fs from 'node:fs';

describe('BudgetService', () => {
  let service: BudgetService;

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

  const mockedBudgetDTO = {
    budgets: mockedBudgets,
  };

  const mockedBudgetDTOJson = JSON.stringify(mockedBudgetDTO);

  beforeEach(async () => {
    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/transactions.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedBudgetDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetService],
    }).compile();

    service = module.get<BudgetService>(BudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns budgets', () => {
    expect(service.getBudget()).toEqual(mockedBudgets);
  });
});
