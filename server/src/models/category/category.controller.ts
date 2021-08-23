import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<Category> {
    return await this.categoryService.findById(id);
  }

  @Post('/')
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.createEntity(createCategoryDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() category: Category): Promise<Category> {
    return await this.categoryService.updateEntity(id, category);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.categoryService.deleteEntity(id);
  }
}
