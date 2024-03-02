import { Injectable } from '@nestjs/common';
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
}
