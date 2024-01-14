import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'build',
    description: 'имя категории',
  })
  readonly categoryName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'строительные', description: 'описание' })
  readonly description: string;
}
