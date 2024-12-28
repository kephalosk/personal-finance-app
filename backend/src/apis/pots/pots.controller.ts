import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import { PotsService } from './pots.service';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';

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
    status: HttpStatus.NOT_FOUND,
    description: 'Pots not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while getting pots.',
  })
  async getPots(): Promise<APIPotDTO[]> {
    try {
      return await this.potsService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pots not found.');
      }
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
      await this.potsService.addNewPot(newPot);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error adding new pot: ${error.message}`,
      );
    }
  }

  @Put('editPot')
  @ApiOperation({ summary: 'Edit an existing pot' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pot successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pot not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while editing pot.',
  })
  async editPot(@Body() editedPot: APIEditedPotDTO): Promise<void> {
    try {
      await this.potsService.editPot(editedPot);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pot not found.');
      }
      throw new InternalServerErrorException(
        `Error while editing pot: ${error.message}`,
      );
    }
  }
}
