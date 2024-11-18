import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './apis/balance/balance.module';
import { TransactionsModule } from './apis/transactions/transactions.module';
import { PotsModule } from './apis/pots/pots.module';
import { BudgetModule } from './apis/budget/budget.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pots } from './model/entities/Pots';
import { Budgets } from './model/entities/Budgets';
import { Balance } from './model/entities/Balance';
import { Transactions } from './model/entities/Transactions';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        ssl: {
          rejectUnauthorized: false,
        },
        synchronize: false,
        logging: true,
        entities: [Pots, Budgets, Balance, Transactions],
        migrations: [],
        subscribers: [],
      }),
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
