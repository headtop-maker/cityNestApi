import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryServiceSchema } from './schemas/category.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'UserCategoryService', schema: CategoryServiceSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
