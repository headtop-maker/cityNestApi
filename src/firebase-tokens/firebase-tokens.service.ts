import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { FireBaseTokensService } from './schemas/firebase-tokens.schema';

@Injectable()
export class FirebaseTokensService {
  constructor(
    @InjectModel(FireBaseTokensService.name)
    private fireBaseTokensService: mongoose.Model<FireBaseTokensService>,
  ) {}

  async addToken(token: FireBaseTokensService): Promise<FireBaseTokensService> {
    const getToken = await this.fireBaseTokensService.findOne({
      tokens: token.tokens,
    });
    if (!getToken) {
      const res = await this.fireBaseTokensService.create(token);
      return res;
    }

    return;
  }

  async findTokens(): Promise<FireBaseTokensService[]> {
    const tokens = await this.fireBaseTokensService.find();
    return tokens;
  }

  async deleteToken(token: string): Promise<string> {
    const result = await this.fireBaseTokensService.deleteOne({
      tokens: token,
    });

    if (!result) {
      throw new NotFoundException('не найдено');
    }
    return 'ok';
  }
}
