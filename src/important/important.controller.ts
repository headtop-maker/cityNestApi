import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ImportantService } from './important.service';

import { ImportantDto } from './dto/important.dto';
import { Important } from './schemas/important.schema';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/user-auth.guard';

@ApiBearerAuth()
@ApiTags('Центр сообщений')
@Controller('important')
export class ImportantController {
  constructor(private importantService: ImportantService) {}

  @ApiOperation({ summary: 'Создать обращение' })
  @ApiResponse({ status: 200, type: Important })
  @Post()
  // разблокировать
  @UseGuards(UserAuthGuard)
  async createImportantMessage(
    @Body()
    important: ImportantDto,
  ): Promise<Important> {
    return this.importantService.createImportantMessage(important);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllImportant(): Promise<Important[]> {
    return this.importantService.findAllImportantMessage();
  }

  @ApiOperation({ summary: 'Получить сообщения по получателю' })
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, type: [Important] })
  @Get(':recipient')
  async findImportantByRecipient(
    @Param('recipient')
    recipient: string,
  ): Promise<Important[]> {
    return this.importantService.findAllByrecipientImportantMessage(recipient);
  }

  @ApiOperation({ summary: 'Получить сообщения по автору' })
  @UseGuards(UserAuthGuard)
  @ApiResponse({ status: 200, type: [Important] })
  @Get('/author/:author')
  async findImportantByAuthor(
    @Param('author')
    author: string,
  ): Promise<Important[]> {
    return this.importantService.findAllByAuthorImportantMessage(author);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteImportantById(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.importantService.deleteImportantMessageById(id);
  }
}
