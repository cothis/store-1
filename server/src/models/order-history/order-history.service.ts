import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderHistoryRepository } from './order-history.repository';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { OrderHistory } from './entities/order-history.entity';

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectRepository(OrderHistoryRepository) private readonly orderHistoryRepository: OrderHistoryRepository,
  ) {}

  async findAll(): Promise<OrderHistory[]> {
    return await this.orderHistoryRepository.findAll();
  }

  async findById(id: string): Promise<OrderHistory> {
    return await this.orderHistoryRepository.findById(id);
  }

  async createEntity(createOrderHistoryDto: CreateOrderHistoryDto): Promise<OrderHistory> {
    return await this.orderHistoryRepository.createEntity(createOrderHistoryDto);
  }

  async updateEntity(id: string, orderHistory: OrderHistory): Promise<OrderHistory> {
    return await this.orderHistoryRepository.updateEntity(id, orderHistory);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.orderHistoryRepository.deleteEntity(id);
  }
}
