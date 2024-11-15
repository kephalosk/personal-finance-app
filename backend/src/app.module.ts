import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PotsModule } from './pots/pots.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [BalanceModule, TransactionsModule, PotsModule, BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
