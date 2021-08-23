import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(CartRepository) private readonly cartRepository: CartRepository) {}

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.findAll();
  }

  async findById(id: string): Promise<Cart> {
    return await this.cartRepository.findById(id);
  }

  async createEntity(crateCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartRepository.createEntity(crateCartDto);
  }

  async updateEntity(id: string, cart: Cart): Promise<Cart> {
    return await this.cartRepository.updateEntity(id, cart);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.cartRepository.deleteEntity(id);
  }
}
