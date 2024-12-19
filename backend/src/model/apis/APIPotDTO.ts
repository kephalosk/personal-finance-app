import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class APIPotDTO {
  @ApiProperty({
    description: 'The name of the pot',
    example: 'Laptop',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The target amount of the pot',
    example: 2400,
  })
  @IsInt()
  target: number;

  @ApiProperty({
    description: 'The current amount of the pot',
    example: 2000,
  })
  @IsInt()
  total: number;

  @ApiProperty({
    description: 'The color theme of the pot',
    example: '#FFFFFF',
  })
  @IsString()
  theme: string;
}
