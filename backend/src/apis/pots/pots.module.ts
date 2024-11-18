import { Module } from '@nestjs/common';
import { PotsController } from './pots.controller';
import { PotsService } from './pots.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pots } from '../../model/entities/Pots';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Pots])],
  controllers: [PotsController],
  providers: [PotsService],
})
export class PotsModule {}
