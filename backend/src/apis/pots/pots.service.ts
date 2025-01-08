import { Injectable, NotFoundException } from '@nestjs/common';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { Pots } from '../../model/entities/Pots';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';
import { APIPotTotalDTO } from '../../model/apis/APIPotTotalDTO';

@Injectable()
export class PotsService {
  constructor(
    @InjectRepository(Pots)
    private readonly potsRepository: Repository<Pots>,
  ) {}

  async findAll(): Promise<APIPotDTO[]> {
    const pots: Pots[] = await this.potsRepository.find();

    if (!pots.length) {
      throw new NotFoundException('No pots found.');
    }

    return this.mapPotEntities(pots);
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

  async addNewPot(newPot: APIPotDTO): Promise<void> {
    const newPotRecord: Pots = this.potsRepository.create({
      name: newPot.name,
      target: newPot.target,
      total: newPot.total,
      theme: newPot.theme,
    });
    await this.potsRepository.save(newPotRecord);
  }

  async editPot(editedPot: APIEditedPotDTO): Promise<void> {
    const potToUpdate: Pots = await this.potsRepository.findOne({
      where: { name: editedPot.oldName },
    });

    if (!potToUpdate) {
      throw new NotFoundException(
        `No pot found with name ${editedPot.oldName}.`,
      );
    }

    const update: Partial<APIPotDTO> = {
      name: editedPot.name,
      target: editedPot.target,
      total: editedPot.total,
      theme: editedPot.theme,
    };

    await this.potsRepository.update(potToUpdate.id, update);
  }

  async deletePot(name: string): Promise<void> {
    const potToDelete: Pots = await this.potsRepository.findOne({
      where: { name },
    });

    if (!potToDelete) {
      throw new NotFoundException(`No pot found with name ${name}.`);
    }

    await this.potsRepository.remove(potToDelete);
  }

  async updatePotTotal(newPotTotal: APIPotTotalDTO): Promise<void> {
    const potToUpdate: Pots = await this.potsRepository.findOne({
      where: { name: newPotTotal.potName },
    });

    if (!potToUpdate) {
      throw new NotFoundException(
        `No pot found with name ${newPotTotal.potName}.`,
      );
    }

    const update: Partial<APIPotDTO> = {
      total: newPotTotal.newTotal,
    };

    await this.potsRepository.update(potToUpdate.id, update);
  }
}
