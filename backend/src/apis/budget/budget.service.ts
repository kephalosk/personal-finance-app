import { Injectable, NotFoundException } from '@nestjs/common';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Budgets } from '../../model/entities/Budgets';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budgets)
    private readonly budgetsRepository: Repository<Budgets>,
  ) {}

  async findAll(): Promise<APIBudgetDTO[]> {
    const budgets: Budgets[] = await this.budgetsRepository.find();

    if (!budgets.length) {
      throw new NotFoundException('No budgets found.');
    }

    return this.mapBudgetEntities(budgets);
  }

  mapBudgetEntities(budgets: Budgets[]): APIBudgetDTO[] {
    const mappedBudgets: APIBudgetDTO[] = [];
    budgets.forEach((budget: Budgets): void => {
      const newBudget: APIBudgetDTO = {
        category: budget.category,
        maximum: budget.maximum,
        theme: budget.theme,
      };
      mappedBudgets.push(newBudget);
    });
    return mappedBudgets;
  }

  async addNewBudget(newBudget: APIBudgetDTO): Promise<void> {
    const newBudgetRecord: Budgets = this.budgetsRepository.create({
      category: newBudget.category,
      maximum: newBudget.maximum,
      theme: newBudget.theme,
    });

    await this.budgetsRepository.save(newBudgetRecord);
  }

  async updateBudget(editedBudget: APIBudgetDTO): Promise<void> {
    const budgetToUpdate: Budgets = await this.budgetsRepository.findOne({
      where: { category: editedBudget.category },
    });

    if (!budgetToUpdate) {
      throw new NotFoundException(
        `No budget found with category ${editedBudget.category}.`,
      );
    }

    const update: Partial<APIBudgetDTO> = {
      maximum: editedBudget.maximum,
      theme: editedBudget.theme,
    };

    await this.budgetsRepository.update(budgetToUpdate.id, update);
  }

  async deleteBudget(category: string): Promise<void> {
    const budgetToDelete: Budgets = await this.budgetsRepository.findOne({
      where: { category },
    });

    if (!budgetToDelete) {
      throw new NotFoundException(`No budget found with category ${category}.`);
    }

    await this.budgetsRepository.remove(budgetToDelete);
  }
}
