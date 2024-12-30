import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import getErrorMessage from '../../utils/getErrorMessage';

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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Balances not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Server error occurred while retrieving balances from database.',
  })
  async getBalance(): Promise<APIBalanceDTO> {
    try {
      return this.balanceService.findBalance();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Balances not found.');
      }
      throw new InternalServerErrorException(
        `Error while retrieving balances from database: ${getErrorMessage(error)}`,
      );
    }
  }
}
