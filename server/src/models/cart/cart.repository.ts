import { EntityRepository, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  async findAll(): Promise<Cart[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<Cart> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createCartDto: CreateCartDto): Promise<Cart> {
    return await this.save(createCartDto);
  }

  async updateEntity(id: string, cart: Cart): Promise<Cart> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...cart });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
