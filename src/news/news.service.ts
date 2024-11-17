import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './schemas/news.shema';
import * as mongoose from 'mongoose';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private newsModel: mongoose.Model<News>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findAllNews(): Promise<News[]> {
    const news = await this.newsModel.find();
    return news;
  }

  async createNews(news: News): Promise<News> {
    const res = await this.newsModel.create(news);
    this.firebaseService.sendNotification(
      [
        'efevhQw6Qre-2avkkjzrDI:APA91bF8t-ETUAJqzqK5GXwUPDNQdvUM-dXoJJLJHTHciwDsBbk8ApNwORpxx1-OprCyNXG-TfsCDqftd_Lidlq8t02OCvJFR106dsrPQGd_xpxsGJQ1cF0',
      ],
      {
        title: 'Наш поселок',
        body: 'Вышла новая новость',
      },
    );
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
