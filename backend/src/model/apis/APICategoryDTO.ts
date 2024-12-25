import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class APICategoryDTO {
  @ApiProperty({
    description: 'The category of the budget',
    example: 'General',
  })
  @IsString()
  category: string;
}
