import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Check server health status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Server is reachable and healthy',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server is not healthy',
  })
  async getHealthStatus(): Promise<string> {
    try {
      await this.appService.isDatabaseHealthy();
      return 'Server is reachable and healthy';
    } catch (error) {
      throw new InternalServerErrorException(`Health check failed: ${error}`);
    }
  }
}
