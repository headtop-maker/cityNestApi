// src/version/version.controller.ts
import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { VersionService } from './version.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VersionDto } from './dto/version.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Версии')
@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @ApiOperation({ summary: 'Создать версию' })
  @ApiBody({ type: VersionDto })
  @ApiResponse({ status: 201, description: 'Версия успешно создана.' })
  @UseGuards(AuthGuard())
  @Post()
  async createVersion(
    @Body('currentVersion') currentVersion: string,
    @Body('description') description: string,
  ) {
    return this.versionService.createVersion(currentVersion, description);
  }

  @Get()
  async getLatestVersion() {
    return this.versionService.getLatestVersion();
  }
}
