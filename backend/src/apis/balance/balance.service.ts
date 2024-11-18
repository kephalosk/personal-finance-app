import { Injectable } from '@nestjs/common';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';
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
    try {
      const balance: Balance[] = await this.balanceRepository.find();
      return this.mapBalanceEntity(balance.at(0));
    } catch (error) {
      console.error('Failed to read balance from database', error);
      return this.getBalance();
    }
  }

  mapBalanceEntity(balance: Balance): APIBalanceDTO {
    return {
      current: balance.current,
      income: balance.income,
      expenses: balance.expenses,
    };
  }

  getBalance(): APIBalanceDTO {
    const filePath = path.join(__dirname, '../balance/balance.data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { balance } = data;
    return balance;
  }
}
