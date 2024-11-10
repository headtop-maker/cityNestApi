import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ImportantContactsService } from './schemas/important-contacts.schema';

@Injectable()
export class ImportantContactService {
  constructor(
    @InjectModel(ImportantContactsService.name)
    private importantContactsService: mongoose.Model<ImportantContactsService>,
  ) {}

  async createImportantContact(
    importantContact: ImportantContactsService,
  ): Promise<ImportantContactsService> {
    const res = await this.importantContactsService.create(importantContact);
    return res;
  }

  async findImportantContacts(): Promise<ImportantContactsService[]> {
    const contacts = await this.importantContactsService.find();
    return contacts;
  }

  async deleteContactById(id: string): Promise<string> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('некорректный ID');
    }

    const news = await this.importantContactsService.deleteOne({ _id: id });

    if (!news) {
      throw new NotFoundException('не найдено');
    }
    return 'ok';
  }
}
