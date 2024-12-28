import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { APIPotDTO } from './APIPotDTO';

export class APIEditedPotDTO extends APIPotDTO {
  @ApiProperty({
    description: 'Old name of the pot',
    example: 'Laptop',
  })
  @IsString()
  oldName: string;
}
