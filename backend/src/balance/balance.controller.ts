import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { APIBalanceDTO } from '../model/APIBalanceDTO';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  getBalance(): APIBalanceDTO {
    try {
      return this.balanceService.getBalance();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen des Kontostands: ${error}`);
    }
  }
}
