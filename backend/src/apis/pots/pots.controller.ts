import { Controller, Get } from '@nestjs/common';
import { PotsService } from './pots.service';
import { APIPotDTO } from '../../model/APIPotDTO';

@Controller('pots')
export class PotsController {
  constructor(private readonly potsService: PotsService) {}

  @Get()
  getPots(): APIPotDTO[] {
    try {
      return this.potsService.getPots();
    } catch (error) {
      throw new Error(`Fehler beim Abrufen der Pots: ${error}`);
    }
  }
}
