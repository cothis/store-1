import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartHasProductRepository } from './cart-has-product.repository';
import { CreateCartHasProductDto } from './dto/create-cart-has-product.dto';
import { CartHasProduct } from './entities/cart-has-product.entity';

@Injectable()
export class CartHasProductService {
  constructor(
    @InjectRepository(CartHasProductRepository) private readonly cartHasProductRepository: CartHasProductRepository,
  ) {}

  async findAll(): Promise<CartHasProduct[]> {
    return await this.cartHasProductRepository.findAll();
  }

  async findById(id: string): Promise<CartHasProduct> {
    return await this.cartHasProductRepository.findById(id);
  }

  async createEntity(createCartHasProductDto: CreateCartHasProductDto): Promise<CartHasProduct> {
    return await this.cartHasProductRepository.createEntity(createCartHasProductDto);
  }

  async updateEntity(id: string, cartHasProduct: CartHasProduct): Promise<CartHasProduct> {
    return await this.cartHasProductRepository.updateEntity(id, cartHasProduct);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.cartHasProductRepository.deleteEntity(id);
  }
}
