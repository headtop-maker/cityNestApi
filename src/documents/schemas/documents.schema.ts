import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class UserDocumentsService {
  @ApiProperty({
    example: 'Смета объекта',
    description: 'Заголовок документа',
  })
  @Prop()
  documentTitle: string;
  @ApiProperty({
    example: 'http://192.168.0.1/house.png',
    description: 'Путь к файлу',
  })
  @Prop()
  filePath: string;
}
export const DocumentsServiceSchema =
  SchemaFactory.createForClass(UserDocumentsService);
