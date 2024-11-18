import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getBalance(): Promise<APITransactionDTO[]> {
    try {
      return await this.transactionsService.findAll();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Transaktionen: ${error}`);
    }
  }
}
