import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAllHaveChildren();
    categories.forEach((cp) => {
      cp.children.forEach((cc) => {
        cc.parent = cp;
      });
    });
    return categories;
  }
}
