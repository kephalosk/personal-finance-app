import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Put,
  ServiceUnavailableException,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { APICategoryDTO } from '../../model/apis/APICategoryDTO';
import getErrorMessage from '../../utils/getErrorMessage';

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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Budgets not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Server error occurred while retrieving budgets from database.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async getBudget(): Promise<APIBudgetDTO[]> {
    try {
      return await this.budgetService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Budgets not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while retrieving budgets from database: ${getErrorMessage(
          error,
        )}`,
      );
    }
  }

  @Post('addNewBudget')
  @ApiOperation({ summary: 'Add a new budget' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Budget successfully created',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while adding new budget to database.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async addNewBudget(@Body() newBudget: APIBudgetDTO): Promise<void> {
    try {
      await this.budgetService.addNewBudget(newBudget);
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while adding budget to database: ${getErrorMessage(error)}`,
      );
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
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while updating budget.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async editBudget(@Body() editedBudget: APIBudgetDTO): Promise<void> {
    try {
      await this.budgetService.updateBudget(editedBudget);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Budgets not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while updating budget in database: ${getErrorMessage(error)}`,
      );
    }
  }

  @Delete('deleteBudget')
  @ApiOperation({ summary: 'Delete an existing budget' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Budget successfully deleted. No content returned.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Budget not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while deleting the budget.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async deleteBudget(@Body() category: APICategoryDTO): Promise<void> {
    try {
      await this.budgetService.deleteBudget(category.category);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Budget not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error deleting budget: ${getErrorMessage(error)}`,
      );
    }
  }
}
