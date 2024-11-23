import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (!getToken.owner && !!token.owner) {
      const filter = { tokens: token.tokens };
      const update = { owner: token.owner };
      const res = await this.fireBaseTokensService.findOneAndUpdate(
        filter,
        update,
      );
      return res;
    }
    if (!getToken) {
      const res = await this.fireBaseTokensService.create(token);
      return res;
    }

    return;
  }

  async findByEmail(email: string): Promise<FireBaseTokensService[]> {
    if (!email) {
      throw new BadRequestException('некорректный email');
    }

    const token = await this.fireBaseTokensService
      .find({ owner: email })
      .exec();

    if (!token) {
      throw new NotFoundException('не найдено');
    }
    return token;
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
