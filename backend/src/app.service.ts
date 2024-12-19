import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './model/entities/Balance';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {}

  async isDatabaseHealthy(): Promise<void> {
    try {
      await this.checkIfDatabaseIsAnswering();
    } catch (error) {
      console.error('Datenbankverbindung fehlgeschlagen:', error);
    }
  }

  private async checkIfDatabaseIsAnswering(): Promise<void> {
    await this.balanceRepository.query('SELECT 1');
  }
}
