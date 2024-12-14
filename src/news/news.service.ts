import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './schemas/news.shema';
import * as mongoose from 'mongoose';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private newsModel: mongoose.Model<News>,
  ) {}

  async findAllNews(): Promise<News[]> {
    const news = await this.newsModel.find().sort({ updatedAt: -1 }).limit(30);
    return news;
  }

  async createNews(news: News): Promise<News> {
    const res = await this.newsModel.create(news);
    return res;
  }

  async findNewsById(id: string): Promise<News> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('некорректный ID');
    }

    const news = await this.newsModel.findById(id);

    if (!news) {
      throw new NotFoundException('не найдено');
    }
    return news;
  }

  async deleteNewsById(id: string): Promise<string> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('некорректный ID');
    }

    const news = await this.newsModel.deleteOne({ _id: id });

    if (!news) {
      throw new NotFoundException('не найдено');
    }
    return 'ok';
  }
}
