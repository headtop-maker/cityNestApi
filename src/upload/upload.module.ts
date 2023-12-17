import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UploadService],
  controllers: [UploadController],
  imports: [
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
})
export class UploadModule {}
