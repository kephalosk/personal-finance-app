import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [BalanceModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
