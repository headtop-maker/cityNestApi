import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PrepareAds } from './schemas/prepareAds.schema';

@Injectable()
export class PrepareAdsService {
  constructor(
    @InjectModel(PrepareAds.name)
    private adsBoardService: mongoose.Model<PrepareAds>,
  ) {}

  async createAds(createAds: PrepareAds): Promise<PrepareAds> {
    const res = await this.adsBoardService.create(createAds);
    return res;
  }

  async findAllAds(): Promise<PrepareAds[]> {
    const allAds = await this.adsBoardService.find().sort({ updatedAt: -1 });
    return allAds;
  }

  async findByCategoryName(categoryName: string): Promise<PrepareAds[]> {
    if (typeof categoryName !== 'string') {
      throw new BadRequestException('not correct  name');
    }

    const allFilterAds = await this.adsBoardService
      .find({ categoryName: categoryName })
      .exec();

    if (!allFilterAds.length) {
      throw new NotFoundException('not found');
    }
    return allFilterAds;
  }

  async deleteAdsById(id: string): Promise<string> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('некорректный ID');
    }

    const news = await this.adsBoardService.deleteOne({ _id: id });

    if (!news) {
      throw new NotFoundException('не найдено');
    }
    return 'ok';
  }
}
