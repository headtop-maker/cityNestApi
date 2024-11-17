import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './schemas/news.shema';
import { AuthModule } from 'src/auth/auth.module';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
  ],
  providers: [NewsService, FirebaseService],
  controllers: [NewsController],
})
export class NewsModule {}
