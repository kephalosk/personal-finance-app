import { Injectable } from '@nestjs/common';
import { APIBalanceDTO } from '../model/APIBalanceDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class BalanceService {
  getBalance(): APIBalanceDTO {
    const filePath = path.join(__dirname, '../data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { balance } = data;
    return balance;
  }
}
