import { Controller, Get, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
  async getBalance(): Promise<APITransactionDTO[]> {
    try {
      return await this.transactionsService.findAll();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Transaktionen: ${error}`);
    }
  }
}
