import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findAll(): Promise<Category[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<Category> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.save(createCategoryDto);
  }

  async updateEntity(id: string, category: Category): Promise<Category> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...category });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
