import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Important {
  @Prop()
  author: string;
  @Prop()
  recipient: string;
  @Prop({ default: 'Информационное сообщение' })
  title: string;
  @Prop()
  description: string;
  @Prop({ default: false })
  isImportant: boolean;
}
export const ImportantSchema = SchemaFactory.createForClass(Important);
