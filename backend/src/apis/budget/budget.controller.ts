import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put('editBudget')
  @ApiOperation({ summary: 'Edit an existing budget' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Budget successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Budget not found',
  })
  async editBudget(@Body() editedBudget: APIBudgetDTO): Promise<void> {
    try {
      await this.budgetService.updateBudget(editedBudget);
    } catch (error) {
      throw new Error(`Fehler beim Bearbeiten des Budgets: ${error}`);
    }
  }

  @Delete('deleteBudget')
  @ApiOperation({ summary: 'Delete an existing budget' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Budget successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Budget not found',
  })
  async deleteBudget(@Body() budget: APIBudgetDTO): Promise<void> {
    try {
      await this.budgetService.deleteBudget(budget);
    } catch (error) {
      throw new Error(`Fehler beim Löschen des Budgets: ${error}`);
    }
  }
}
