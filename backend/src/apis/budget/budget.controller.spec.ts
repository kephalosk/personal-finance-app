import { Test, TestingModule } from '@nestjs/testing';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { APICategoryDTO } from '../../model/apis/APICategoryDTO';
import {
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';

jest.mock('./budget.service', (): { BudgetService: jest.Mock } => ({
  BudgetService: jest.fn().mockImplementation(
    (): {
      findAll: jest.Mock;
      addNewBudget: jest.Mock;
      updateBudget: jest.Mock;
      deleteBudget: jest.Mock;
    } => ({
      findAll: jest.fn(),
      addNewBudget: jest.fn(),
      updateBudget: jest.fn(),
      deleteBudget: jest.fn(),
    }),
  ),
}));

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

const mockedCategory: APICategoryDTO = {
  category: 'Entertainment',
};

describe('BudgetController', (): void => {
  let controller: BudgetController;
  let budgetService: BudgetService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetController],
      providers: [BudgetService],
    }).compile();

    budgetService = module.get<BudgetService>(BudgetService);
    (budgetService.findAll as jest.Mock).mockResolvedValue(mockedBudgets);
    (budgetService.addNewBudget as jest.Mock).mockResolvedValue(undefined);
    (budgetService.updateBudget as jest.Mock).mockResolvedValue(undefined);
    (budgetService.deleteBudget as jest.Mock).mockResolvedValue(undefined);

    controller = module.get<BudgetController>(BudgetController);
  });

  it('is defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('returns budgets', async (): Promise<void> => {
    const result: APIBudgetDTO[] = await controller.getBudget();

    expect(result).toEqual(mockedBudgets);
  });

  it('throws if service call fails', async (): Promise<void> => {
    (budgetService.findAll as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<APIBudgetDTO[]> => controller.getBudget(),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<APIBudgetDTO[]> => controller.getBudget(),
    ).rejects.toThrow(
      'Error while retrieving budgets from database: Service failure',
    );
  });

  it('throws if budgets to get are not found', async (): Promise<void> => {
    (budgetService.findAll as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<APIBudgetDTO[]> => controller.getBudget(),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<APIBudgetDTO[]> => controller.getBudget(),
    ).rejects.toThrow('Budgets not found.');
  });

  it('throws if database connection fails', async (): Promise<void> => {
    (budgetService.findAll as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<APIBudgetDTO[]> => controller.getBudget(),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<APIBudgetDTO[]> => controller.getBudget(),
    ).rejects.toThrow('Database connection error: Connection failed');
  });

  it('adds new budget', async (): Promise<void> => {
    const result: void = await controller.addNewBudget(mockedBudgets[0]);

    expect(result).toBeUndefined();
    expect(budgetService.addNewBudget).toHaveBeenCalledWith(mockedBudgets[0]);
  });

  it('throws if addNewBudget call fails', async (): Promise<void> => {
    (budgetService.addNewBudget as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<void> => controller.addNewBudget(mockedBudgets[0]),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<void> => controller.addNewBudget(mockedBudgets[0]),
    ).rejects.toThrow('Error while adding budget to database: Service failure');
  });

  it('throws if database connection fails for adding new budget', async (): Promise<void> => {
    (budgetService.addNewBudget as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => controller.addNewBudget(mockedBudgets[0]),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => controller.addNewBudget(mockedBudgets[0]),
    ).rejects.toThrow('Database connection error: Connection failed');
  });

  it('updates a budget', async (): Promise<void> => {
    const result: void = await controller.editBudget(mockedBudgets[0]);

    expect(result).toBeUndefined();
    expect(budgetService.updateBudget).toHaveBeenCalledWith(mockedBudgets[0]);
  });

  it('throws if editBudget call fails', async (): Promise<void> => {
    (budgetService.updateBudget as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<void> => controller.editBudget(mockedBudgets[0]),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<void> => controller.editBudget(mockedBudgets[0]),
    ).rejects.toThrow(
      'Error while updating budget in database: Service failure',
    );
  });

  it('throws if budget to edit not found', async (): Promise<void> => {
    (budgetService.updateBudget as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<void> => controller.editBudget(mockedBudgets[0]),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => controller.editBudget(mockedBudgets[0]),
    ).rejects.toThrow('Budgets not found.');
  });

  it('throws if database connection fails for updating a budget', async (): Promise<void> => {
    (budgetService.updateBudget as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => controller.editBudget(mockedBudgets[0]),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => controller.editBudget(mockedBudgets[0]),
    ).rejects.toThrow('Database connection error: Connection failed');
  });

  it('deletes a budget', async (): Promise<void> => {
    const result: void = await controller.deleteBudget(mockedCategory);

    expect(result).toBeUndefined();
    expect(budgetService.deleteBudget).toHaveBeenCalledWith(
      mockedCategory.category,
    );
  });

  it('throws if deleteBudget call fails', async (): Promise<void> => {
    (budgetService.deleteBudget as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<void> => controller.deleteBudget(mockedCategory),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<void> => controller.deleteBudget(mockedCategory),
    ).rejects.toThrow('Error deleting budget: Service failure');
  });

  it('throws if budget to delete not found', async (): Promise<void> => {
    (budgetService.deleteBudget as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<void> => controller.deleteBudget(mockedCategory),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => controller.deleteBudget(mockedCategory),
    ).rejects.toThrow('Budget not found.');
  });

  it('throws if database connection fails for deleting a budget', async (): Promise<void> => {
    (budgetService.deleteBudget as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => controller.deleteBudget(mockedCategory),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => controller.deleteBudget(mockedCategory),
    ).rejects.toThrow('Database connection error: Connection failed');
  });
});
