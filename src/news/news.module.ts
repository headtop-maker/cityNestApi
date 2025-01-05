import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './schemas/news.shema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageUploadModule } from 'src/imageUpload/imageUpload.module';

@Module({
  imports: [
    AuthModule,
    ImageUploadModule,
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
