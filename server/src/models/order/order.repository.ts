import { EntityManager, EntityRepository, getManager, Repository, TransactionManager } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderHasProduct } from './entities/order-has-product.entity';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { FinalPrices } from './price.service';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrderHasProduct(
    order: Order,
    products: Product[],
    quantities: number[],
    @TransactionManager() manager?: EntityManager,
  ) {
    if (!manager) manager = getManager();

    const orderHasProducts = products.map((product, index) => {
      const orderHasProduct = new OrderHasProduct();
      orderHasProduct.order = order;
      orderHasProduct.product = product;
      orderHasProduct.quantity = quantities[index];
      return orderHasProduct;
    });
    return await manager.save<OrderHasProduct>(orderHasProducts);
  }
  async getNewOrder(userId: string, prices: FinalPrices, @TransactionManager() manager?: EntityManager) {
    if (!manager) manager = getManager();

    const user = new User();
    user.id = userId;

    const newOrder = new Order();
    newOrder.user = user;
    newOrder.productsPrice = prices.productsPrice;
    newOrder.deliveryFee = prices.deliveryFee;
    newOrder.paymentPrice = prices.paymentPrice;

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
