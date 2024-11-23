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
import { UserAuthGuard } from 'src/auth/user-auth.guard';

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

  @ApiOperation({ summary: 'отправить пуш уведомление' })
  @Post('/send')
  @UseGuards(AuthGuard())
  async sendPush(
    @Body()
    data: {
      tokens: string[];
      notification: {
        title: string;
        body: string;
      };
    },
  ): Promise<{ data: string }> {
    return this.firebaseTokensService.sendMessage(data);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllTokens(): Promise<SchemaTokens[]> {
    return this.firebaseTokensService.findTokens();
  }

  @UseGuards(UserAuthGuard)
  @ApiOperation({ summary: 'Получить токен' })
  @Get(':owner')
  async getBook(
    @Param('owner')
    categoryName: string,
  ): Promise<SchemaTokens[]> {
    return this.firebaseTokensService.findByEmail(categoryName);
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
