import { Module } from '@nestjs/common';
import { ImportantService } from './important.service';
import { ImportantController } from './important.controller';
import { ImportantSchema } from './schemas/important.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ImageUploadModule } from 'src/imageUpload/imageUpload.module';

@Module({
  imports: [
    AuthModule,
    ImageUploadModule,
    MongooseModule.forFeature([{ name: 'Important', schema: ImportantSchema }]),
  ],
  controllers: [ImportantController],
  providers: [ImportantService],
})
export class ImportantModule {}
