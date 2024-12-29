import { Injectable, NotFoundException } from '@nestjs/common';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Pots } from '../../model/entities/Pots';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';
import { APIPotAdditionDTO } from '../../model/apis/APIPotAdditionDTO';
import { APIPotSubtractionDTO } from '../../model/apis/APIPotSubtractionDTO';

@Injectable()
export class PotsService {
  constructor(
    @InjectRepository(Pots)
    private readonly potsRepository: Repository<Pots>,
  ) {}

  async findAll(): Promise<APIPotDTO[]> {
    try {
      const pots: Pots[] = await this.potsRepository.find();
      return this.mapPotEntities(pots);
    } catch (error) {
      console.error('Failed to read pots from database', error);
      return this.getPots();
    }
  }

  async addNewPot(newPot: APIPotDTO): Promise<void> {
    try {
      const newPotRecord: Pots = this.potsRepository.create({
        name: newPot.name,
        target: newPot.target,
        total: newPot.total,
        theme: newPot.theme,
      });
      await this.potsRepository.save(newPotRecord);
    } catch (error) {
      console.error('Failed to save new pot to database.', error.message);
      throw new Error('Could not add pot.');
    }
  }

  async editPot(editedPot: APIEditedPotDTO): Promise<void> {
    try {
      const potToUpdate: Pots = await this.potsRepository.findOne({
        where: { name: editedPot.oldName },
      });

      if (!potToUpdate) {
        console.error(`No pot found with name ${editedPot.oldName}`);
        return;
      }

      const update: Partial<APIPotDTO> = {
        name: editedPot.name,
        target: editedPot.target,
        total: editedPot.total,
        theme: editedPot.theme,
      };

      await this.potsRepository.update(potToUpdate.id, update);
    } catch (error) {
      console.error('Failed to edit pot in database.', error.message);
      throw new Error('Could not edit pot.');
    }
  }

  async deletePot(name: string): Promise<void> {
    try {
      const potToDelete: Pots = await this.potsRepository.findOne({
        where: { name },
      });

      if (!potToDelete) {
        console.error(`No pot found with name ${name}`);
      }

      await this.potsRepository.remove(potToDelete);
    } catch (error) {
      console.error('Failed to delete pot in database', error);
      throw new Error('Could not delete pot.');
    }
  }

  async addMoneyToPot(potAddition: APIPotAdditionDTO): Promise<void> {
    try {
      const potToAddMoneyTo: Pots = await this.potsRepository.findOne({
        where: { name: potAddition.potName },
      });

      if (!potToAddMoneyTo) {
        console.error(`No pot found with name ${potAddition.potName}`);
      }

      const newTotal = potToAddMoneyTo.total + potAddition.amountToAdd;

      const update: Partial<APIPotDTO> = {
        total: newTotal,
      };

      await this.potsRepository.update(potToAddMoneyTo.id, update);
    } catch (error) {
      console.error('Failed to add money to pot in database', error);
      throw new Error('Could not add money to pot.');
    }
  }

  async withdrawMoneyFromPot(
    potSubtraction: APIPotSubtractionDTO,
  ): Promise<void> {
    try {
      const potToWithdrawFrom: Pots = await this.potsRepository.findOne({
        where: { name: potSubtraction.potName },
      });

      if (!potToWithdrawFrom) {
        console.error(`No pot found with name ${potSubtraction.potName}`);
      }

      let newTotal: number =
        potToWithdrawFrom.total - potSubtraction.amountToSubtract;

      if (newTotal < 0) {
        newTotal = 0;
      }

      const update: Partial<APIPotDTO> = {
        total: newTotal,
      };

      await this.potsRepository.update(potToWithdrawFrom.id, update);
    } catch (error) {
      console.error('Failed to withdraw money from pot in database', error);
      throw new Error('Could not withdraw money from pot.');
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
    const filePath: string = path.join(__dirname, '../pots/pots.data.json');
    const data: { pots: APIPotDTO[] } = JSON.parse(
      fs.readFileSync(filePath, 'utf8'),
    );
    const { pots } = data;
    return pots;
  }
}
