import { EntityRepository, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findAll(query: Partial<Order>): Promise<Order[] | null> {
    const { userId, ...condition } = query;
    return await this.find({ where: { ...condition, ...{ user: { id: userId } } } });
  }

  async findById(id: string): Promise<Order> {
    return await this.findOneOrFail({ where: { id } });
  }

  // async createEntity(dto: CreateOrderDto): Promise<Order> {
  //   return await this.save(dto);
  // }

  async updateEntity(id: string, order: Partial<Order>): Promise<Order> {
    const entity = this.findById(id);
    order.id = id;
    return await this.save({ ...entity, ...order });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
