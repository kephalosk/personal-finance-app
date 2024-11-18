import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { APITransactionDTO } from '../../model/apis/APITransactionDTO';
import { Transactions } from '../../model/entities/Transactions';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionsRepository: Repository<Transactions>,
  ) {}

  async findAll(): Promise<APITransactionDTO[]> {
    try {
      const transactions: Transactions[] =
        await this.transactionsRepository.find();
      return this.mapTransactionsEntity(transactions);
    } catch (error) {
      console.error('Failed to read transactions from database', error);
      return this.getTransactions();
    }
  }

  private mapTransactionsEntity(
    transactions: Transactions[],
  ): APITransactionDTO[] {
    let mappedTransactions: APITransactionDTO[] = [];
    transactions.forEach((transaction: Transactions) => {
      const newTransaction: APITransactionDTO = {
        avatar: transaction.avatar,
        name: transaction.name,
        category: transaction.category,
        date: transaction.date,
        amount: transaction.amount,
        recurring: transaction.recurring,
      };
      mappedTransactions.push(newTransaction);
    });
    return mappedTransactions;
  }

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
