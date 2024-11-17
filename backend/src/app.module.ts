import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './apis/balance/balance.module';
import { TransactionsModule } from './apis/transactions/transactions.module';
import { PotsModule } from './apis/pots/pots.module';
import { BudgetModule } from './apis/budget/budget.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { Pot } from './model/entities/pot.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Pot],
      synchronize: true, //TODO false for production
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    BalanceModule,
    TransactionsModule,
    PotsModule,
    BudgetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
