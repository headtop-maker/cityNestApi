import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VersionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0.0.1',
    description: 'Текущая версия',
  })
  readonly currentVersion: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Описать что изменилось',
    description: 'Общие исправления',
  })
  readonly description: string;
}
