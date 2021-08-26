import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  allCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
