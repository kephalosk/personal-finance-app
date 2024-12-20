import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Budgets } from '../../model/entities/Budgets';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('BudgetService', () => {
  let service: BudgetService;
  let repository: Repository<Budgets>;

  const mockedBudgetsEntity: Budgets[] = [
    {
      id: 1,
      category: 'Dining Out',
      maximum: 100.0,
      theme: '#277C78',
    },
    {
      id: 2,
      category: 'Bills',
      maximum: 1000.0,
      theme: '#82C9D7',
    },
  ];

  const mockedBudgetsEntityMapped: APIBudgetDTO[] = [
    {
      category: 'Dining Out',
      maximum: 100.0,
      theme: '#277C78',
    },
    {
      category: 'Bills',
      maximum: 1000.0,
      theme: '#82C9D7',
    },
  ];

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
    const mockRepository = {
      find: jest.fn().mockResolvedValue(mockedBudgetsEntity),
      findOne: jest.fn().mockResolvedValue(mockedBudgetsEntity[0]),
      create: jest.fn().mockReturnValue(mockedBudgetsEntity[0]),
      save: jest.fn().mockResolvedValue(mockedBudgetsEntity[0]),
      update: jest.fn().mockResolvedValue(mockedBudgetsEntity[0]),
    };

    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/transactions.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedBudgetDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetService,
        {
          provide: getRepositoryToken(Budgets),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BudgetService>(BudgetService);
    repository = module.get<Repository<Budgets>>(getRepositoryToken(Budgets));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns budgets from repository', async () => {
    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedBudgetsEntityMapped);
    expect(result).not.toEqual(mockedBudgets);
  });

  it('returns budgets from file if repository fails', async () => {
    jest
      .spyOn(repository, 'find')
      .mockRejectedValue(new Error('Database error'));

    const result = await service.findAll();

    expect(result).toEqual(mockedBudgets);
    expect(result).not.toEqual(mockedBudgetsEntityMapped);
  });

  it('adds new budget to repository', async () => {
    await service.addNewBudget(mockedBudgetsEntityMapped[0]);

    expect(repository.create).toHaveBeenCalledWith(
      mockedBudgetsEntityMapped[0],
    );
    expect(repository.save).toHaveBeenCalledWith(mockedBudgetsEntity[0]);
  });

  it('throws error if adding new Budget to repository fails', async () => {
    jest
      .spyOn(repository, 'save')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.addNewBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow('Could not save budget');
  });

  it('updates budget in repository', async () => {
    await service.updateBudget(mockedBudgetsEntityMapped[0]);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { category: mockedBudgetsEntityMapped[0].category },
    });

    expect(repository.update).toHaveBeenCalledWith(1, {
      maximum: mockedBudgetsEntityMapped[0].maximum,
      theme: mockedBudgetsEntityMapped[0].theme,
    });
  });

  it('throws error if updating Budget in repository fails', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.updateBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow('Database error');
  });
});
