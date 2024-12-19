import { Controller, Get, HttpStatus } from '@nestjs/common';
import { PotsService } from './pots.service';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('pots')
export class PotsController {
  constructor(private readonly potsService: PotsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pots' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all pots',
    type: [APIPotDTO],
  })
  async getPots(): Promise<APIPotDTO[]> {
    try {
      return await this.potsService.findAll();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Pots: ${error}`);
    }
  }
}
