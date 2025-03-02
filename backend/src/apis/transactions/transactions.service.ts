import { Injectable, NotFoundException } from '@nestjs/common';
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
    const transactions: Transactions[] =
      await this.transactionsRepository.find();

    if (!transactions.length) {
      throw new NotFoundException('No transactions found.');
    }

    return this.mapTransactionsEntity(transactions);
  }

  private mapTransactionsEntity(
    transactions: Transactions[],
  ): APITransactionDTO[] {
    const mappedTransactions: APITransactionDTO[] = [];
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
}
