import { Controller, Get } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async getBudget(): Promise<APIBudgetDTO[]> {
    try {
      return await this.budgetService.findAll();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Budgets: ${error}`);
    }
  }
}
