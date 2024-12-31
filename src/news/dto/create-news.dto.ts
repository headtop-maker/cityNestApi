import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'headtop@mail.ru', description: 'Автор новости' })
  readonly author: string;
  // @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'заголовок', description: 'Заголовок новости' })
  readonly title: string;
  // @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'описание', description: 'Описание новости' })
  readonly description: string;
  // @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'https://images.squarespace-cdn.com/content/v1/54db7288e4b0d3f042fa0b33/1555097159302-CSCTY5ZGR0XA2NM7INRD/news.jpg?format=2500w',
    description: 'Ссылка на изображение для новости',
  })
  readonly image: string;
}
