import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { APITransactionDTO } from '../model/APITransactionDTO';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getBalance(): APITransactionDTO[] {
    try {
      return this.transactionsService.getTransactions();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Transaktionen: ${error}`);
    }
  }
}
