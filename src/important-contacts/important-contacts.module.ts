import { Module } from '@nestjs/common';
import { ImportantContactService } from './important-contacts.service';
import { ImportantContactsController } from './important-contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportantContactsSchema } from './schemas/important-contacts.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'ImportantContactsService', schema: ImportantContactsSchema },
    ]),
  ],
  controllers: [ImportantContactsController],
  providers: [ImportantContactService],
  exports: [ImportantContactService],
})
export class ImportantContactsModule {}
