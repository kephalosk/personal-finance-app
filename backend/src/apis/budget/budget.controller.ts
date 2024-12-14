import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  @ApiOperation({ summary: 'Get all budgets' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all budgets',
    type: [APIBudgetDTO],
  })
  async getBudget(): Promise<APIBudgetDTO[]> {
    try {
      return await this.budgetService.findAll();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Budgets: ${error}`);
    }
  }

  @Post('addNewBudget')
  @ApiOperation({ summary: 'Add a new budget' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Budget successfully created',
  })
  async addNewBudget(@Body() newBudget: APIBudgetDTO): Promise<void> {
    try {
      await this.budgetService.addNewBudget(newBudget);
    } catch (error) {
      throw new Error(`Fehler beim Anlegen des neuen Budgets: ${error}`);
    }
  }
}
