import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdsBoard } from './schemas/adsboard.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdsboardService {
  constructor(
    @InjectModel(AdsBoard.name)
    private adsBoardService: mongoose.Model<AdsBoard>,
  ) {}

  async createAds(createAds: AdsBoard): Promise<AdsBoard> {
    const res = await this.adsBoardService.create(createAds);
    return res;
  }

  async findAllAds(): Promise<AdsBoard[]> {
    const allAds = await this.adsBoardService.find().sort({ updatedAt: -1 });
    return allAds;
  }

  async findByCategoryName(categoryName: string): Promise<AdsBoard[]> {
    if (typeof categoryName !== 'string') {
      throw new BadRequestException('not correct  name');
    }

    const allFilterAds = await this.adsBoardService
      .find({ categoryName: categoryName })
      .sort({ updatedAt: -1 })
      .limit(30)
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
