import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budgets } from '../../model/entities/Budgets';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Budgets])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
