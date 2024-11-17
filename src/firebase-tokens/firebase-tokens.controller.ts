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
import { FirebaseTokensService } from './firebase-tokens.service';
import { FireBaseTokensService as SchemaTokens } from './schemas/firebase-tokens.schema';

import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Firebase tokens')
@Controller('firebase-tokens')
export class FirebaseTokensController {
  constructor(private firebaseTokensService: FirebaseTokensService) {}

  @ApiOperation({ summary: 'Добавить токен' })
  @Post()
  @UseGuards(AuthGuard())
  async createImportantMessage(
    @Body()
    token: SchemaTokens,
  ): Promise<SchemaTokens> {
    return this.firebaseTokensService.addToken(token);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllTokens(): Promise<SchemaTokens[]> {
    return this.firebaseTokensService.findTokens();
  }

  @Delete(':token')
  @UseGuards(AuthGuard())
  async deleteToken(
    @Param('token')
    id: string,
  ): Promise<string> {
    return this.firebaseTokensService.deleteToken(id);
  }
}
