import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class APIBalanceDTO {
  @ApiProperty({
    description: 'The current balance',
    example: 10000,
  })
  @IsInt()
  current: number;

  @ApiProperty({
    description: 'The current income',
    example: 4000,
  })
  @IsInt()
  income: number;

  @ApiProperty({
    description: 'The current expenses',
    example: 2000,
  })
  @IsInt()
  expenses: number;
}
