import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImportantContactService } from './important-contacts.service';
import { ImportantContactsService } from './schemas/important-contacts.schema';
import { ImportantContactsDto } from './dto/important-contacts.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Важные контакты')
@Controller('important-contacts')
export class ImportantContactsController {
  constructor(private importantContactService: ImportantContactService) {}

  @ApiOperation({ summary: 'Создать контакты' })
  @Post()
  @UseGuards(AuthGuard())
  async createImportantMessage(
    @Body()
    contanct: ImportantContactsService,
  ): Promise<ImportantContactsDto> {
    return this.importantContactService.createImportantContact(contanct);
  }

  @Get()
  async getAllImportant(): Promise<ImportantContactsService[]> {
    return this.importantContactService.findImportantContacts();
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteContactById(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.importantContactService.deleteContactById(id);
  }
}
