import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { ImportantModule } from './important/important.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';

import { AdsboardModule } from './adsboard/adsboard.module';
import { ImportantContactsController } from './important-contacts/important-contacts.controller';
import { ImportantContactService } from './important-contacts/important-contacts.service';
import { ImportantContactsModule } from './important-contacts/important-contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    NewsModule,
    AuthModule,
    ImportantModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: 'uploads',
    }),
    CategoryModule,
    AdsboardModule,
    ImportantContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
