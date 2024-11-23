import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class FireBAseTokensDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: '++AAA+++' })
  readonly tokens: string;
  @IsString()
  @ApiProperty({ example: 'kolia@mail.ru', description: 'Владелец' })
  readonly owner: string;
}
