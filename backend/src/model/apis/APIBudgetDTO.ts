import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class APIBudgetDTO {
  @ApiProperty({
    description: 'The category of the budget',
    example: 'General',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'The maximum amount for the budget',
    example: 100,
  })
  @IsInt()
  maximum: number;

  @ApiProperty({
    description: 'The theme color for the budget',
    example: '#000000',
  })
  @IsString()
  theme: string;
}
