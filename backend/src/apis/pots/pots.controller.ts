import { Controller, Get } from '@nestjs/common';
import { PotsService } from './pots.service';
import { APIPotDTO } from '../../model/apis/APIPotDTO';

@Controller('pots')
export class PotsController {
  constructor(private readonly potsService: PotsService) {}

  @Get()
  async getPots(): Promise<APIPotDTO[]> {
    try {
      return await this.potsService.findAll();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Pots: ${error}`);
    }
  }
}
