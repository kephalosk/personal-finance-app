import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './apis/balance/balance.module';
import { TransactionsModule } from './apis/transactions/transactions.module';
import { PotsModule } from './apis/pots/pots.module';
import { BudgetModule } from './apis/budget/budget.module';

@Module({
  imports: [BalanceModule, TransactionsModule, PotsModule, BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
