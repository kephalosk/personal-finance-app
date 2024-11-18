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
      const budgets = await this.budgetsRepository.find();
      return this.mapBudgetEntities(budgets);
    } catch (error) {
      console.error('Failed to read budgets from database', error);
      return this.getBudget();
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
