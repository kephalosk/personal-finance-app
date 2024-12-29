import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class APIPotAdditionDTO {
  @ApiProperty({
    description: 'The name of the pot',
    example: 'Holiday',
  })
  @IsString()
  potName: string;

  @ApiProperty({
    description: 'The amount of money to add to the pot',
    example: 1000,
  })
  @IsInt()
  amountToAdd: number;
}
