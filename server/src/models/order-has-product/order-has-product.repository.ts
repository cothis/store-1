import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderHasProduct } from './dto/create-order-has-product.dto';
import { OrderHasProduct } from './entities/order-has-product.entity';

@EntityRepository(OrderHasProduct)
export class OrderHasProductRepository extends Repository<OrderHasProduct> {
  async findAll(): Promise<OrderHasProduct[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<OrderHasProduct> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createOrderHasProductDto: CreateOrderHasProduct): Promise<OrderHasProduct> {
    return await this.save(createOrderHasProductDto);
  }

  async updateEntity(id: string, orderHasProduct: OrderHasProduct): Promise<OrderHasProduct> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...orderHasProduct });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
