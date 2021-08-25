import { EntityRepository, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findAll(): Promise<Order[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<Order> {
    return await this.findOneOrFail({ where: { id } });
  }

  // async createEntity(dto: CreateOrderDto): Promise<Order> {
  //   return await this.save(dto);
  // }

  async updateEntity(id: string, order: Order): Promise<Order> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...order });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
