import { Injectable } from '@nestjs/common';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Pots } from '../../model/entities/Pots';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PotsService {
  constructor(
    @InjectRepository(Pots)
    private readonly potsRepository: Repository<Pots>,
  ) {}

  async findAll(): Promise<APIPotDTO[]> {
    try {
      const pots = await this.potsRepository.find();
      return this.mapPotEntities(pots);
    } catch (error) {
      console.error('Failed to read pots from database', error);
      return this.getPots();
    }
  }

  mapPotEntities(pots: Pots[]): APIPotDTO[] {
    let mappedPots: APIPotDTO[] = [];
    pots.forEach((pot: Pots): void => {
      const newPot: APIPotDTO = {
        name: pot.name,
        target: pot.target,
        total: pot.total,
        theme: pot.theme,
      };
      mappedPots.push(newPot);
    });
    return mappedPots;
  }

  getPots(): APIPotDTO[] {
    const filePath = path.join(__dirname, '../pots/pots.data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { pots } = data;
    return pots;
  }
}
