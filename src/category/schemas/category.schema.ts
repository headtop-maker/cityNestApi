import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class UserCategoryService {
  @ApiProperty({
    example: 'build',
    description: 'имя категории',
  })
  @Prop()
  categoryName: string;
  @ApiProperty({ example: 'строительные', description: 'описание' })
  @Prop()
  description: string;
}
export const CategoryServiceSchema =
  SchemaFactory.createForClass(UserCategoryService);
