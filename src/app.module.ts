import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { ImportantModule } from './important/important.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
