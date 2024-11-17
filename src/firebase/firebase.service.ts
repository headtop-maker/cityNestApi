import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    const serviceAccount = path.resolve('src', 'serviceAccount.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // Отправка уведомлений
  async sendNotification(
    tokens: string[], // Один или несколько токенов устройства
    notification: {
      title: string;
      body: string;
    },
    data?: Record<string, string>, // Дополнительные данные
  ): Promise<any> {
    const message = {
      notification,
      data,
      tokens,
    };
    return admin.messaging().sendEachForMulticast(message);
  }
}
