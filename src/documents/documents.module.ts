import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DocumentsServiceSchema } from './schemas/documents.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'UserDocumentsService', schema: DocumentsServiceSchema },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
