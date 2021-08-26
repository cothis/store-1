import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { AppConfigService } from 'src/config/app.service';
import path from 'path';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository,
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

  // async createEntity(createOrderDto: CreateOrderDto): Promise<Order> {
  //   return await this.orderRepository.createEntity(createOrderDto);
  // }

  async updateEntity(id: string, order: Partial<Order>): Promise<Order> {
    return await this.orderRepository.updateEntity(id, order);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.orderRepository.deleteEntity(id);
  }
}
