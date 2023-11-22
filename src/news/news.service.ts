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
    const news = await this.newsModel.find();
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

    const book = await this.newsModel.findById(id);

    if (!book) {
      throw new NotFoundException('не найдено');
    }
    return book;
  }
}
