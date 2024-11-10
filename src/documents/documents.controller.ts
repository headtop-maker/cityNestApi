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
import { DocumentsService } from './documents.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDocumentsService } from './schemas/documents.schema';
import { DocumentsDto } from './dto/documents.dto';

@ApiBearerAuth()
@ApiTags('Документы')
@Controller('documents')
export class DocumentsController {
  constructor(private userDocumentsService: DocumentsService) {}

  @ApiOperation({ summary: 'Добавить документ' })
  @Post()
  @UseGuards(AuthGuard())
  async createImportantMessage(
    @Body()
    document: UserDocumentsService,
  ): Promise<DocumentsDto> {
    return this.userDocumentsService.createDocument(document);
  }

  @Get()
  async getDocuments(): Promise<UserDocumentsService[]> {
    return this.userDocumentsService.findDocuments();
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteDocumentsById(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.userDocumentsService.deleteDocumentById(id);
  }
}
