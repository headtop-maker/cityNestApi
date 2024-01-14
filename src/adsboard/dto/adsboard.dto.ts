import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AdsBoardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+795211111111', description: 'телефон' })
  readonly phone: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'name@name.com', description: 'почта' })
  readonly email: string;
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
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'img.jpg', description: 'картинка' })
  readonly image: string;
}
