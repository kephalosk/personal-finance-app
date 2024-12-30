import { Injectable, NotFoundException } from '@nestjs/common';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from '../../model/entities/Balance';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {}

  async findBalance(): Promise<APIBalanceDTO> {
    const balance: Balance[] = await this.balanceRepository.find();

    if (!balance.length) {
      throw new NotFoundException('No balance found.');
    }

    return this.mapBalanceEntity(balance.at(0));
  }

  mapBalanceEntity(balance: Balance): APIBalanceDTO {
    return {
      current: balance.current,
      income: balance.income,
      expenses: balance.expenses,
    };
  }
}
