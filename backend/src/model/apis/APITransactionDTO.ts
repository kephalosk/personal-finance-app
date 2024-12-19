import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class APITransactionDTO {
  @ApiProperty({
    description: 'The image source of the transaction partner',
    example: '/images/avatars/emma-richardson.jpg',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'The name of the transaction partner',
    example: 'Emma Richardson',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The category of the transaction',
    example: 'General',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'The date of the transaction',
    example: '2024-08-19T14:23:11Z',
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: 'The amount of the transaction',
    example: 100,
  })
  @IsInt()
  amount: number;

  @ApiProperty({
    description: 'The recurring state of the transaction',
    example: false,
  })
  @IsBoolean()
  recurring: boolean;
}
