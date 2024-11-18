import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getBalance(): Promise<APIBalanceDTO> {
    try {
      return this.balanceService.findBalance();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen des Kontostands: ${error}`);
    }
  }
}
