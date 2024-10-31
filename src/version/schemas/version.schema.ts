import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Version extends Document {
  @ApiProperty({
    example: '0.0.1',
    description: 'Текущая версия',
  })
  @Prop({ required: true })
  currentVersion: string;
  @ApiProperty({
    example: 'Описать что изменилось',
    description: 'Общие исправления',
  })
  @Prop()
  description: string;
}

export const VersionSchema = SchemaFactory.createForClass(Version);
