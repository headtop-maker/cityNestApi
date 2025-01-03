import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Important {
  @ApiProperty({ example: 'headtop@mail.ru', description: 'Автор сообщения' })
  @Prop()
  author: string;
  @ApiProperty({
    example: 'Петров Олег Александрович',
    description: 'Имя для отображения',
  })
  @Prop({ default: 'Серверное сообщение' })
  authorName: string;
  @ApiProperty({ example: 'kolia@mail.ru', description: 'Получатель' })
  @Prop()
  recipient: string;
  @ApiProperty({
    example: 'сообщение',
    description: 'Заголовок сообщения',
  })
  @Prop({ default: 'Информационное сообщение' })
  title: string;
  @ApiProperty({ example: 'Текст сообщения', description: 'Тело сообщения' })
  @Prop()
  description: string;
  @ApiProperty({ example: 'false', description: 'Важное' })
  @Prop({ default: false })
  isImportant: boolean;

  @ApiProperty({ example: '', description: '' })
  @Prop({ default: '' })
  imageBase64: string;
}
export const ImportantSchema = SchemaFactory.createForClass(Important);
