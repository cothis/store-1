import { EntityManager, EntityRepository, getManager, Repository, TransactionManager } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderHasProduct } from './entities/order-has-product.entity';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrderHasProduct(
    @TransactionManager() manager: EntityManager,
    order: Order,
    products: Product[],
    quantities: number[],
  ) {
    const orderHasProducts = products.map((product, index) => {
      const orderHasProduct = new OrderHasProduct();
      orderHasProduct.order = order;
      orderHasProduct.product = product;
      orderHasProduct.quantity = quantities[index];
      return orderHasProduct;
    });
    return await manager.save<OrderHasProduct>(orderHasProducts);
  }
  async getNewOrder(@TransactionManager() manager: EntityManager, userId: string) {
    const newOrder = new Order();
    const user = new User();
    user.id = userId;
    newOrder.user = user;

    return await manager.save<Order>(newOrder);
  }

  async findAll(status?: OrderStatus): Promise<Order[]> {
    return await this.find({
      where: {
        ...(status && { status }),
      },
    });
  }

  async findById(id: string, @TransactionManager() manager?: EntityManager): Promise<Order> {
    if (!manager) {
      return await this.findOne({
        where: { id },
      });
    }

    return await manager.findOne(Order, id);
  }

  async updateEntity(id: string, order: UpdateOrderDto, @TransactionManager() manager?: EntityManager): Promise<Order> {
    const entity = this.findById(id);
    const newEntity = { ...entity, ...order };

    if (!manager) {
      return await this.save(newEntity);
    }

    return manager.save(Order, newEntity);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
