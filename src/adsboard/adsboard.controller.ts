import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdsboardService } from './adsboard.service';
import { AuthGuard } from '@nestjs/passport';

import { AdsBoardDto } from './dto/adsboard.dto';
import { AdsBoard } from './schemas/adsboard.schema';

@ApiBearerAuth()
@ApiTags('Работа с услугами')
@Controller('adsboard')
export class AdsboardController {
  constructor(private adsboardService: AdsboardService) {}

  @ApiOperation({ summary: 'Создать услугу' })
  @Post()
  @UseGuards(AuthGuard())
  async createImportantMessage(
    @Body()
    currentAds: AdsBoard,
  ): Promise<AdsBoardDto> {
    return this.adsboardService.createAds(currentAds);
  }
  @ApiOperation({ summary: 'Получить все услуги' })
  @Get()
  async getAllIAds(): Promise<AdsBoard[]> {
    return this.adsboardService.findAllAds();
  }

  @ApiOperation({ summary: 'Получить все услуги по имени категории' })
  @Get(':categoryName')
  async getBook(
    @Param('categoryName')
    categoryName: string,
  ): Promise<AdsBoard[]> {
    return this.adsboardService.findByCategoryName(categoryName);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteAdsById(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.adsboardService.deleteAdsById(id);
  }
}
