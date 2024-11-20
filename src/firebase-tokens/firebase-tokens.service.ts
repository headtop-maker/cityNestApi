import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { FireBaseTokensService } from './schemas/firebase-tokens.schema';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class FirebaseTokensService {
  constructor(
    @InjectModel(FireBaseTokensService.name)
    private fireBaseTokensService: mongoose.Model<FireBaseTokensService>,
    private readonly firebaseService: FirebaseService,
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

  async sendMessage(message: {
    tokens: string[];
    notification: {
      title: string;
      body: string;
    };
  }): Promise<{ data: string }> {
    this.firebaseService.sendNotification(message.tokens, message.notification);
    return { data: 'ok' };
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
