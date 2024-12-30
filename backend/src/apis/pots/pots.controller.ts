import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Put,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PotsService } from './pots.service';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';
import { APIPotNameDTO } from '../../model/apis/APIPotNameDTO';
import { APIPotAdditionDTO } from '../../model/apis/APIPotAdditionDTO';
import { APIPotSubtractionDTO } from '../../model/apis/APIPotSubtractionDTO';
import getErrorMessage from '../../utils/getErrorMessage';

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
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async getPots(): Promise<APIPotDTO[]> {
    try {
      return await this.potsService.findAll();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pots not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error getting pots: ${getErrorMessage(error)}`,
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
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async addNewPot(@Body() newPot: APIPotDTO): Promise<void> {
    try {
      await this.potsService.addNewPot(newPot);
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error adding new pot: ${getErrorMessage(error)}`,
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
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async editPot(@Body() editedPot: APIEditedPotDTO): Promise<void> {
    try {
      await this.potsService.editPot(editedPot);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pot not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while editing pot: ${getErrorMessage(error)}`,
      );
    }
  }

  @Delete('deletePot')
  @ApiOperation({ summary: 'Delete an existing budget' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Pot successfully deleted. No content returned.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pot not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while deleting the pot.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePot(@Body() potToDelete: APIPotNameDTO): Promise<void> {
    try {
      await this.potsService.deletePot(potToDelete.potName);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pot not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while deleting pot: ${getErrorMessage(error)}`,
      );
    }
  }

  @Put('addMoneyToPot')
  @ApiOperation({ summary: 'Add money to an existing pot' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Money successfully added to Pot.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Pot not found.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while adding money to pot.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async addMoneyToPot(@Body() potAddition: APIPotAdditionDTO): Promise<void> {
    try {
      await this.potsService.addMoneyToPot(potAddition);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pot not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while adding money to pot: ${getErrorMessage(error)}`,
      );
    }
  }

  @Put('withdrawMoneyFromPot')
  @ApiOperation({ summary: 'Withdraw money from an existing pot' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Money successfully withdrawned from Pot.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pot not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while withdrawing money from pot.',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'Failed to connect to the database.',
  })
  async withdrawMoneyFromPot(
    @Body() potSubtraction: APIPotSubtractionDTO,
  ): Promise<void> {
    try {
      await this.potsService.withdrawMoneyFromPot(potSubtraction);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Pot not found.');
      }
      if (error instanceof ServiceUnavailableException) {
        throw new ServiceUnavailableException(
          `Database connection error: ${getErrorMessage(error)}`,
        );
      }
      throw new InternalServerErrorException(
        `Error while withdrawing money from pot: ${getErrorMessage(error)}`,
      );
    }
  }
}
