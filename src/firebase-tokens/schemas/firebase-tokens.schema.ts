import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class FireBaseTokensService {
  @ApiProperty({ example: '+++AAA+++' })
  @Prop()
  tokens: string;
  @ApiProperty({ example: 'kolia@mail.ru', description: 'Владелец' })
  @Prop()
  owner: string;
}
export const FireBaseTokensSchema = SchemaFactory.createForClass(
  FireBaseTokensService,
);
