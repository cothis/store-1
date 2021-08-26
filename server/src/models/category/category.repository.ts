import { EntityRepository, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findAllHaveChildren(): Promise<Category[]> {
    return this.createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'recommend')
      .where('category.parent is null')
      .getMany();
  }
}
