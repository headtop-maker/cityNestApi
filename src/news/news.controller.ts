import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './schemas/news.shema';
import { CreateNewskDto } from './dto/create-news.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  async getAllNews(): Promise<News[]> {
    return this.newsService.findAllNews();
  }

  @Post()
  async createNews(
    @Body()
    news: CreateNewskDto,
  ): Promise<News> {
    return this.newsService.createNews(news);
  }

  @Get(':id')
  async findNewsById(
    @Param('id')
    id: string,
  ): Promise<News> {
    return this.newsService.findNewsById(id);
  }
}
