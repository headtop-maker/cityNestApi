import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class ImportantContactsService {
  @ApiProperty({
    example: 'Водоканал',
    description: 'имя контакта',
  })
  @Prop()
  contactName: string;
  @ApiProperty({ example: ['+79527873361', '8(313)252525'] })
  @Prop()
  contacts: string[];
}
export const ImportantContactsSchema = SchemaFactory.createForClass(
  ImportantContactsService,
);
