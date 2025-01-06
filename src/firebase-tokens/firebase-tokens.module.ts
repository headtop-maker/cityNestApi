import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FireBaseTokensSchema } from './schemas/firebase-tokens.schema';
import { FirebaseTokensService } from './firebase-tokens.service';
import { FirebaseTokensController } from './firebase-tokens.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: 'FireBaseTokensService', schema: FireBaseTokensSchema },
    ]),
  ],
  controllers: [FirebaseTokensController],
  providers: [FirebaseTokensService, FirebaseService],
  exports: [FirebaseTokensService],
})
export class FirebaseTokensModule {}
