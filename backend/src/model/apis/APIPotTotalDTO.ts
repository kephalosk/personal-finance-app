import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class APIPotTotalDTO {
  @ApiProperty({
    description: 'The name of the pot',
    example: 'Holiday',
  })
  @IsString()
  potName: string;

  @ApiProperty({
    description: 'The new total of the pot',
    example: 1000,
  })
  @IsInt()
  newTotal: number;
}
