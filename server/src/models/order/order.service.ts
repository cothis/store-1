import { HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { AppConfigService } from 'src/config/app.service';
import path from 'path';
import { CreateOrderDto } from './dto/create-order.dto';
import { EntityManager, getManager } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PriceService } from './price.service';
import { OrderHasProduct } from './entities/order-has-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly priceService: PriceService,
    private readonly appConfigService: AppConfigService,
  ) {}

  private prefixImageUrl(order: Order) {
    order.orderHasProducts.forEach(
      (orderHasProduct) =>
        (orderHasProduct.product.image = path.join(this.appConfigService.s3, orderHasProduct.product.image)),
    );
  }

  async findAll(status?: OrderStatus): Promise<Order[]> {
    const orders = await this.orderRepository.findAll(status);
    orders.forEach((order) => this.prefixImageUrl(order));
    return orders;
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    this.prefixImageUrl(order);
    return order;
  }

  async createOrder(newOrder: CreateOrderDto, userId: string, manager?: EntityManager) {
    try {
      if (!manager) manager = getManager();
      return await manager.transaction<Order>(async (tm) => {
        const prices = await this.priceService.calculatePrices(newOrder.products, tm);
        const createdOrder = await this.orderRepository.getNewOrder(userId, prices, tm);
        const products = await this.productService.findByIds(
          newOrder.products.map((product) => product.id),
          tm,
        );
        const quantities = newOrder.products.map((product) => product.quantity);

        await this.orderRepository.createOrderHasProduct(createdOrder, products, quantities, tm);
        return await this.orderRepository.findById(createdOrder.id, tm);
      });
    } catch (err) {
      throw new NotAcceptableException({
        status: HttpStatus.NOT_ACCEPTABLE,
        error: '주문 생성 실패',
      });
    }
  }

  async updateEntity(id: string, order: UpdateOrderDto, manager?: EntityManager): Promise<Order> {
    try {
      if (!manager) manager = getManager();

      return await manager.transaction(async (tm) => {
        await this.orderRepository.updateEntity(id, order, tm);
        return await this.orderRepository.findById(id);
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
