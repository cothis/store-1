import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderHasProductRepository } from './order-has-product.repository';
import { CreateOrderHasProduct } from './dto/create-order-has-product.dto';
import { OrderHasProduct } from './entities/order-has-product.entity';

@Injectable()
export class OrderHasProductService {
  constructor(
    @InjectRepository(OrderHasProductRepository) private readonly boardContentRepository: OrderHasProductRepository,
  ) {}

  async findAll(): Promise<OrderHasProduct[]> {
    return await this.boardContentRepository.findAll();
  }

  async findById(id: string): Promise<OrderHasProduct> {
    return await this.boardContentRepository.findById(id);
  }

  async createEntity(createOrderHasProductDto: CreateOrderHasProduct): Promise<OrderHasProduct> {
    return await this.boardContentRepository.createEntity(createOrderHasProductDto);
  }

  async updateEntity(id: string, orderHasProduct: OrderHasProduct): Promise<OrderHasProduct> {
    return await this.boardContentRepository.updateEntity(id, orderHasProduct);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.boardContentRepository.deleteEntity(id);
  }
}
