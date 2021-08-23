import { EntityRepository, Repository } from 'typeorm';
import { CreateCartHasProductDto } from './dto/create-cart-has-product.dto';
import { CartHasProduct } from './entities/cart-has-product.entity';

@EntityRepository(CartHasProduct)
export class CartHasProductRepository extends Repository<CartHasProduct> {
  async findAll(): Promise<CartHasProduct[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<CartHasProduct> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createCartHasProductDto: CreateCartHasProductDto): Promise<CartHasProduct> {
    return await this.save(createCartHasProductDto);
  }

  async updateEntity(id: string, cartHasProduct: CartHasProduct): Promise<CartHasProduct> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...cartHasProduct });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
