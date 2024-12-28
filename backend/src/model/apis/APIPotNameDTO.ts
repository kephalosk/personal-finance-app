import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class APIPotNameDTO {
  @ApiProperty({
    description: 'The name of a pot',
    example: 'Holiday',
  })
  @IsString()
  potName: string;
}
