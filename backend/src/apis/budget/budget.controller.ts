import { Controller, Get } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { APIBudgetDTO } from '../../model/APIBudgetDTO';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  getBudget(): APIBudgetDTO[] {
    try {
      return this.budgetService.getBudget();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Budgets: ${error}`);
    }
  }
}
