import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { PotsService } from './pots.service';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('pots')
export class PotsController {
  constructor(private readonly potsService: PotsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pots' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved all pots',
    type: [APIPotDTO],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while getting pots.',
  })
  async getPots(): Promise<APIPotDTO[]> {
    try {
      return await this.potsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        `Error getting pots: ${error.message}`,
      );
    }
  }

  @Post('addNewPot')
  @ApiOperation({ summary: 'Add new pot' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New pot successfully added.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while adding new pot.',
  })
  async addNewPot(@Body() newPot: APIPotDTO): Promise<void> {
    try {
      console.log('callservice with', newPot);
      await this.potsService.addNewPot(newPot);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error adding new pot: ${error.message}`,
      );
    }
  }
}
