import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findAll(): Promise<Product[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<Product> {
    return await this.findOneOrFail({ where: { id } });
  }

  // async createEntity(createProductDto: CreateProductDto): Promise<Product> {
  //   return await this.save(createProductDto);
  // }

  async updateEntity(id: string, product: Product): Promise<Product> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...product });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
