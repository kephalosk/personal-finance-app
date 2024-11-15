import { Module } from '@nestjs/common';
import { PotsController } from './pots.controller';
import { PotsService } from './pots.service';

@Module({
  controllers: [PotsController],
  providers: [PotsService],
})
export class PotsModule {}
