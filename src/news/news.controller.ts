import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './schemas/news.shema';
import { CreateNewskDto } from './dto/create-news.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  async getAllNews(): Promise<News[]> {
    return this.newsService.findAllNews();
  }

  @Post()
  @UseGuards(AuthGuard())
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
