import { Module } from '@nestjs/common';
import { PotsController } from './pots.controller';
import { PotsService } from './pots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pot } from '../../model/entities/pot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pot])],
  controllers: [PotsController],
  providers: [PotsService],
})
export class PotsModule {}
