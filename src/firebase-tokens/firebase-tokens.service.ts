import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { FireBaseTokensService } from './schemas/firebase-tokens.schema';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class FirebaseTokensService {
  constructor(
    @InjectModel(FireBaseTokensService.name)
    private fireBaseTokensService: mongoose.Model<FireBaseTokensService>,
    private readonly firebaseService: FirebaseService,
    private readonly authService: AuthService,
  ) {}

  async addToken(token: FireBaseTokensService): Promise<FireBaseTokensService> {
    const getToken = await this.fireBaseTokensService.findOne({
      owner: token.owner,
    });

    if (!getToken) {
      const res = await this.fireBaseTokensService.create(token);
      return res;
    }

    if (getToken && !!token.owner && !!token.tokens) {
      const filter = { owner: token.owner };
      const update = { tokens: token.tokens };

      const res = await this.fireBaseTokensService.findOneAndUpdate(
        filter,
        update,
      );

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
    data?: Record<string, string>;
  }): Promise<{ data: string }> {
    this.firebaseService.sendNotification(
      message.tokens,
      message.notification,
      message.data,
    );
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

  async adminsTokens(): Promise<string> {
    const admins = await this.authService.adminsUsers();
    const tokens = await this.fireBaseTokensService.find();
    const filtertokens = tokens
      .map((item) => {
        if (!!admins.some((it) => it.email === item.owner)) {
          return item.tokens;
        }
        return;
      })
      .filter((it) => it !== undefined);
    if (filtertokens.length > 0) {
      await this.sendMessage({
        tokens: filtertokens,
        notification: {
          title: 'Новая регистрация в сервисе',
          body: 'Проверьте список пользователей ',
        },
      });
    }
    return 'ok';
  }
}
