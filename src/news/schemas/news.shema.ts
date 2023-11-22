import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class News {
  @Prop()
  author: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  image: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
