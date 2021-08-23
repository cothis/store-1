import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryRepository.findById(id);
  }

  async createEntity(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.createEntity(createCategoryDto);
  }

  async updateEntity(id: string, category: Category): Promise<Category> {
    return await this.categoryRepository.updateEntity(id, category);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.categoryRepository.deleteEntity(id);
  }
}
