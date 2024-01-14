import { Injectable } from '@nestjs/common';
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
}
