import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository) {}

  async findAll(query: Partial<Order>): Promise<Order[]> {
    return await this.orderRepository.findAll(query);
  }

  async findById(id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
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
