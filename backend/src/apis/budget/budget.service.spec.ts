import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';
import { Budgets } from '../../model/entities/Budgets';
import { DeepPartial, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';
import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';

describe('BudgetService', (): void => {
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

  const mockedBudgets: APIBudgetDTO[] = [
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

  beforeEach(async (): Promise<void> => {
    const mockRepository: {
      find: jest.Mock;
      findOne: jest.Mock;
      create: jest.Mock;
      save: jest.Mock;
      update: jest.Mock;
      remove: jest.Mock;
    } = {
      find: jest.fn().mockResolvedValue(mockedBudgetsEntity),
      findOne: jest.fn().mockResolvedValue(mockedBudgetsEntity[0]),
      create: jest.fn().mockReturnValue(mockedBudgetsEntity[0]),
      save: jest.fn().mockResolvedValue(mockedBudgetsEntity[0]),
      update: jest.fn().mockResolvedValue({}),
      remove: jest.fn().mockResolvedValue(mockedBudgetsEntity[0]),
    };

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

  it('is defined', (): void => {
    expect(service).toBeDefined();
  });

  it('returns budgets from repository', async (): Promise<void> => {
    const result: APIBudgetDTO[] = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedBudgetsEntityMapped);
    expect(result).not.toEqual(mockedBudgets);
  });

  it('throws when budgets not found', async (): Promise<void> => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(
      (): Promise<APIBudgetDTO[]> => service.findAll(),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<APIBudgetDTO[]> => service.findAll(),
    ).rejects.toThrow('No budgets found.');
  });

  it('throws when database connection fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'find')
      .mockImplementation((): Promise<Budgets[]> => {
        throw new ServiceUnavailableException('Connection failed');
      });

    await expect(
      (): Promise<APIBudgetDTO[]> => service.findAll(),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<APIBudgetDTO[]> => service.findAll(),
    ).rejects.toThrow('Connection failed');
  });

  it('adds new budget to repository', async (): Promise<void> => {
    await service.addNewBudget(mockedBudgetsEntityMapped[0]);

    expect(repository.create).toHaveBeenCalledWith(
      mockedBudgetsEntityMapped[0],
    );
    expect(repository.save).toHaveBeenCalledWith(mockedBudgetsEntity[0]);
  });

  it('throws error if adding new Budget to repository fails', async () => {
    jest
      .spyOn(repository, 'save')
      .mockImplementation((): Promise<DeepPartial<Budgets> & Budgets> => {
        throw new ServiceUnavailableException('Connection failed');
      });

    await expect(
      (): Promise<void> => service.addNewBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => service.addNewBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow('Connection failed');
  });

  it('updates budget in repository', async (): Promise<void> => {
    await service.updateBudget(mockedBudgetsEntityMapped[0]);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { category: mockedBudgetsEntityMapped[0].category },
    });

    expect(repository.update).toHaveBeenCalledWith(1, {
      maximum: mockedBudgetsEntityMapped[0].maximum,
      theme: mockedBudgetsEntityMapped[0].theme,
    });
  });

  it('throws if budget to update is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(
      (): Promise<void> => service.updateBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => service.updateBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow(
      `No budget found with category ${mockedBudgetsEntityMapped[0].category}.`,
    );
  });

  it('throws error if updating Budget in repository fails', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockImplementation((): Promise<DeepPartial<Budgets> & Budgets> => {
        throw new ServiceUnavailableException('Connection failed');
      });

    await expect(
      (): Promise<void> => service.updateBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => service.updateBudget(mockedBudgetsEntityMapped[0]),
    ).rejects.toThrow('Connection failed');
  });

  it('deletes budget in repository', async (): Promise<void> => {
    await service.deleteBudget(mockedBudgetsEntityMapped[0].category);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { category: mockedBudgetsEntityMapped[0].category },
    });

    expect(repository.remove).toHaveBeenCalledWith(mockedBudgetsEntity[0]);
  });

  it('throws if budget to delete is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(
      (): Promise<void> =>
        service.deleteBudget(mockedBudgetsEntityMapped[0].category),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> =>
        service.deleteBudget(mockedBudgetsEntityMapped[0].category),
    ).rejects.toThrow(
      `No budget found with category ${mockedBudgetsEntityMapped[0].category}.`,
    );
  });

  it('throws error if deleting Budget in repository fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'findOne')
      .mockImplementation((): Promise<DeepPartial<Budgets> & Budgets> => {
        throw new ServiceUnavailableException('Connection failed');
      });

    await expect(
      (): Promise<void> =>
        service.deleteBudget(mockedBudgetsEntityMapped[0].category),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> =>
        service.deleteBudget(mockedBudgetsEntityMapped[0].category),
    ).rejects.toThrow('Connection failed');
  });
});
