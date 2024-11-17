import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';

@Injectable()
export class TransactionsService {
  getTransactions(): APITransactionDTO[] {
    const filePath = path.join(
      __dirname,
      '../transactions/transactions.data.json',
    );
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { transactions } = data;
    return transactions;
  }
}
