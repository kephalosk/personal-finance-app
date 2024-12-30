import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import getErrorMessage from '../../utils/getErrorMessage';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all transactions',
    type: [APITransactionDTO],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transactions not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Server error occurred while retrieving transactions from database.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async getBalance(): Promise<APITransactionDTO[]> {
    try {
      return await this.transactionsService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Transactions not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while retrieving transactions from database: ${getErrorMessage(error)}`,
      );
    }
  }
}
