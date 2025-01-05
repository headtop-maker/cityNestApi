import { Module } from '@nestjs/common';

import { ImageUploadController } from './imageUpload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { ImageUploadService } from './imageUpload.service';

@Module({
  providers: [ImageUploadService],
  controllers: [ImageUploadController],
  exports: [ImageUploadService],
  imports: [
    AuthModule,
    MulterModule.register({
      dest: './imageUploads',
    }),
  ],
})
export class ImageUploadModule {}
