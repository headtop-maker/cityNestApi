import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class AdsBoard {
  @ApiProperty({ example: '+795211111111', description: 'телефон' })
  @Prop()
  phone: string;

  @ApiProperty({ example: 'name@name.com', description: 'почта' })
  @Prop()
  email: string;

  @ApiProperty({
    example: 'build',
    description: 'имя категории',
  })
  @Prop()
  categoryName: string;

  @ApiProperty({ example: 'что то предоставляем', description: 'заголовок' })
  @Prop()
  title: string;

  @ApiProperty({ example: 'строительные', description: 'описание' })
  @Prop()
  description: string;

  @ApiProperty({ example: 'img.jpg', description: 'картинка' })
  @Prop()
  image: string;
}
export const AdsBoardSchema = SchemaFactory.createForClass(AdsBoard);
