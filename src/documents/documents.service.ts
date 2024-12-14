import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const documents = await this.userDocumentsService
      .find()
      .sort({ updatedAt: -1 });
    return documents;
  }

  async deleteDocumentById(id: string): Promise<string> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('некорректный ID');
    }

    const news = await this.userDocumentsService.deleteOne({ _id: id });

    if (!news) {
      throw new NotFoundException('не найдено');
    }
    return 'ok';
  }
}
