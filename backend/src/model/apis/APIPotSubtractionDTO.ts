import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class APIPotSubtractionDTO {
  @ApiProperty({
    description: 'The name of the pot',
    example: 'Holiday',
  })
  @IsString()
  potName: string;

  @ApiProperty({
    description: 'The amount of money to substract from the pot',
    example: 1000,
  })
  @IsInt()
  amountToSubstract: number;
}
