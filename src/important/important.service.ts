import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Important } from './schemas/important.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class ImportantService {
  constructor(
    @InjectModel(Important.name)
    private importantModel: mongoose.Model<Important>,
  ) {}

  async createImportantMessage(
    importantMessage: Important,
  ): Promise<Important> {
    const res = await this.importantModel.create(importantMessage);
    return res;
  }

  async findAllImportantMessage(): Promise<Important[]> {
    const imporatant = await this.importantModel.find();
    return imporatant;
  }

  async findAllByrecipientImportantMessage(
    recipient: string,
  ): Promise<Important[]> {
    const imporatant = await this.importantModel
      .find({ recipient: recipient })
      .sort({ createdAt: -1 });
    return imporatant;
  }

  async findAllByAuthorImportantMessage(author: string): Promise<Important[]> {
    const imporatant = await this.importantModel
      .find({ author: author })
      .sort({ createdAt: -1 });
    return imporatant;
  }

  async deleteImportantMessageById(id: string): Promise<string> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('некорректный ID');
    }

    const news = await this.importantModel.deleteOne({ _id: id });

    if (!news) {
      throw new NotFoundException('не найдено');
    }
    return 'ok';
  }
}
