import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get current balance' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved the current balance',
    type: APIBalanceDTO,
  })
  async getBalance(): Promise<APIBalanceDTO> {
    try {
      return this.balanceService.findBalance();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen des Kontostands: ${error}`);
    }
  }
}
