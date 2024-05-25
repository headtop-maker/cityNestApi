import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DocumentsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Смета объекта',
    description: 'Заголовок документа',
  })
  readonly documentTitle: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'http://192.168.0.1/house.png',
    description: 'Путь к файлу',
  })
  readonly filePath: string;
}
