import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FireBAseTokensDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: '++AAA+++' })
  readonly tokens: string;
}
