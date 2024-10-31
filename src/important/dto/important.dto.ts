import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ImportantDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'headtop@mail.ru', description: 'Автор сообщения' })
  readonly author: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Петров Олег Александрович',
    description: 'Имя для отображения',
  })
  readonly authorName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'kolia@mail.ru', description: 'Получатель' })
  readonly recipient: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'сообщение',
    description: 'Заголовок сообщения',
  })
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Текст сообщения', description: 'Тело сообщения' })
  readonly description: string;
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: 'false', description: 'Важное' })
  readonly isImportant: boolean;
}
