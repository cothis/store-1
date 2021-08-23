import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { OrderHistory } from './entities/order-history.entity';

@EntityRepository(OrderHistory)
export class OrderHistoryRepository extends Repository<OrderHistory> {
  async findAll(): Promise<OrderHistory[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<OrderHistory> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createOrderHistoryDto: CreateOrderHistoryDto): Promise<OrderHistory> {
    return await this.save(createOrderHistoryDto);
  }

  async updateEntity(id: string, orderHistory: OrderHistory): Promise<OrderHistory> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...orderHistory });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
