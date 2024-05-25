import { Injectable } from '@nestjs/common';
import { UserDocumentsService } from './schemas/documents.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(UserDocumentsService.name)
    private userDocumentsService: mongoose.Model<UserDocumentsService>,
  ) {}

  async createDocument(
    document: UserDocumentsService,
  ): Promise<UserDocumentsService> {
    const res = await this.userDocumentsService.create(document);
    return res;
  }

  async findDocuments(): Promise<UserDocumentsService[]> {
    const documents = await this.userDocumentsService.find();
    return documents;
  }
}
