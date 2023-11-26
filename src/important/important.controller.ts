import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImportantService } from './important.service';

import { ImportantDto } from './dto/important.dto';
import { Important } from './schemas/important.schema';

@Controller('important')
export class ImportantController {
  constructor(private importantService: ImportantService) {}

  @Post()
  async createImportantMessage(
    @Body()
    important: ImportantDto,
  ): Promise<Important> {
    return this.importantService.createImportantMessage(important);
  }

  @Get()
  async getAllImportant(): Promise<Important[]> {
    return this.importantService.findAllImportantMessage();
  }

  @Get(':recipient')
  async findImportantByRecipient(
    @Param('recipient')
    recipient: string,
  ): Promise<Important[]> {
    return this.importantService.findAllByrecipientImportantMessage(recipient);
  }
}
