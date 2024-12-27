import { Injectable } from '@nestjs/common';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';
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
    try {
      const budgets: Budgets[] = await this.budgetsRepository.find();
      return this.mapBudgetEntities(budgets);
    } catch (error) {
      console.error('Failed to read budgets from database', error);
      return this.getBudget();
    }
  }

  async addNewBudget(newBudget: APIBudgetDTO): Promise<void> {
    try {
      const newBudgetRecord: Budgets = this.budgetsRepository.create({
        category: newBudget.category,
        maximum: newBudget.maximum,
        theme: newBudget.theme,
      });
      await this.budgetsRepository.save(newBudgetRecord);
    } catch (error) {
      console.error('Failed to save new budget to database', error);
      throw new Error('Could not save budget');
    }
  }

  async updateBudget(editedBudget: APIBudgetDTO): Promise<void> {
    try {
      const budgetToUpdate: Budgets = await this.budgetsRepository.findOne({
        where: { category: editedBudget.category },
      });

      if (!budgetToUpdate) {
        console.error(`No budget found with category ${editedBudget.category}`);
        return;
      }

      const update: Partial<APIBudgetDTO> = {
        maximum: editedBudget.maximum,
        theme: editedBudget.theme,
      };

      await this.budgetsRepository.update(budgetToUpdate.id, update);
    } catch (error) {
      console.error('Failed to update budget in database', error);
      throw error;
    }
  }

  async deleteBudget(category: string): Promise<void> {
    try {
      const budgetToDelete: Budgets = await this.budgetsRepository.findOne({
        where: { category },
      });

      if (!budgetToDelete) {
        console.error(
          `No budget found with category ${budgetToDelete.category}`,
        );
        return;
      }

      await this.budgetsRepository.remove(budgetToDelete);
    } catch (error) {
      console.error('Failed to delete budget in database', error);
      throw error;
    }
  }

  mapBudgetEntities(budgets: Budgets[]): APIBudgetDTO[] {
    let mappedBudgets: APIBudgetDTO[] = [];
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

  getBudget(): APIBudgetDTO[] {
    const filePath: string = path.join(__dirname, '../budget/budget.data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { budgets } = data;
    return budgets;
  }
}
