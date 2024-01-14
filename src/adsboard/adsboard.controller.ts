import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
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
}
