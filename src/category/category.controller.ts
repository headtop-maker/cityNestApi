import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UserCategoryService } from './schemas/category.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@ApiBearerAuth()
@ApiTags('Категории услуг')
@Controller('category')
export class CategoryController {
  constructor(private userServicesService: CategoryService) {}

  @ApiOperation({ summary: 'Создать категорию' })
  @Post()
  @UseGuards(AuthGuard())
  async createImportantMessage(
    @Body()
    сategory: UserCategoryService,
  ): Promise<CategoryDto> {
    return this.userServicesService.createUserCategory(сategory);
  }

  @Get()
  async getAllImportant(): Promise<UserCategoryService[]> {
    return this.userServicesService.findAllUserCategory();
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteNewsById(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.userServicesService.deleteCategoryById(id);
  }
}
