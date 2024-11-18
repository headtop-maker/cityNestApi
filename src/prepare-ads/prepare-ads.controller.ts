import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrepareAdsService } from './prepare-ads.service';
import { AuthGuard } from '@nestjs/passport';
import { PrepareAds } from './schemas/prepareAds.schema';
import { UserAuthGuard } from 'src/auth/user-auth.guard';

@ApiBearerAuth()
@ApiTags('Модерация объявлений')
@Controller('prepare-ads')
export class PrepareAdsController {
  constructor(private prepareAdsService: PrepareAdsService) {}

  @ApiOperation({ summary: 'Создать услугу' })
  @Post()
  @UseGuards(UserAuthGuard)
  async createImportantMessage(
    @Body()
    currentAds: PrepareAds,
  ): Promise<PrepareAds> {
    return this.prepareAdsService.createAds(currentAds);
  }

  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Получить все услуги' })
  @Get()
  async getAllIAds(): Promise<PrepareAds[]> {
    return this.prepareAdsService.findAllAds();
  }
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Получить все услуги по имени категории' })
  @Get(':categoryName')
  async getBook(
    @Param('categoryName')
    categoryName: string,
  ): Promise<PrepareAds[]> {
    return this.prepareAdsService.findByCategoryName(categoryName);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteAdsById(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.prepareAdsService.deleteAdsById(id);
  }
}
