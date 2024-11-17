import { Injectable } from '@nestjs/common';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from '../../model/entities/pot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PotsService {
  constructor(
    @InjectRepository(Pot)
    private potsRepository: Repository<Pot>,
  ) {}

  async findAll(): Promise<APIPotDTO[]> {
    const pots = await this.potsRepository.find();
    return this.mapPotEntities(pots);
  }

  mapPotEntities(pots): APIPotDTO[] {
    let mappedPots = [];
    pots.forEach((pot) => {
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
