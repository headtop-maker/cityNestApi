import { Injectable } from '@nestjs/common';
import { UserCategoryService } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(UserCategoryService.name)
    private userServiceCategory: mongoose.Model<UserCategoryService>,
  ) {}

  async createUserCategory(
    userCategory: UserCategoryService,
  ): Promise<UserCategoryService> {
    const res = await this.userServiceCategory.create(userCategory);
    return res;
  }
  async findAllUserCategory(): Promise<UserCategoryService[]> {
    const category = await this.userServiceCategory.find();
    return category;
  }
}
