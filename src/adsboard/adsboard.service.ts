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
    const allAds = await this.adsBoardService.find();
    return allAds;
  }

  async findByCategoryName(categoryName: string): Promise<AdsBoard[]> {
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
}
