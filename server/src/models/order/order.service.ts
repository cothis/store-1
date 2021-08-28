import { HttpStatus, Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { AppConfigService } from 'src/config/app.service';
import path from 'path';
import { CreateOrderDto } from './dto/create-order.dto';
import { EntityManager, getManager, TransactionManager } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async findAll(status?: OrderStatus): Promise<Order[]> {
    return await this.orderRepository.findAll(status);
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    order.orderHasProducts.forEach(
      (orderHasProduct) =>
        (orderHasProduct.product.image = path.join(this.appConfigService.s3, orderHasProduct.product.image)),
    );
    return order;
  }

  async createOrder(newOrder: CreateOrderDto, userId: string) {
    try {
      return await getManager().transaction<Order>(async (manager) => {
        const createdOrder = await this.orderRepository.getNewOrder(manager, userId);
        const products = await this.productService.findByIds(newOrder.products.map((product) => product.id));
        const quantities = newOrder.products.map((product) => product.quantity);

        await this.orderRepository.createOrderHasProduct(manager, createdOrder, products, quantities);
        return await this.orderRepository.findById(createdOrder.id, manager);
      });
    } catch (err) {
      throw new NotAcceptableException({
        status: HttpStatus.NOT_ACCEPTABLE,
        error: '주문 생성 실패',
      });
    }
  }

  async updateEntity(id: string, order: UpdateOrderDto, manager: EntityManager): Promise<Order> {
    try {
      if (!manager) {
        return await this.orderRepository.updateEntity(id, order);
      }

      return await manager.transaction(async (tm) => {
        return await this.orderRepository.updateEntity(id, order, tm);
      });
    } catch {
      throw new NotAcceptableException({
        status: HttpStatus.NOT_ACCEPTABLE,
        error: '주문 변경 실패',
      });
    }
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.orderRepository.deleteEntity(id);
  }
}
