import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductRepository) private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findById(id: string): Promise<Product> {
    return await this.productRepository.findById(id);
  }

  async createEntity(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.createEntity(createProductDto);
  }

  async updateEntity(id: string, product: Product): Promise<Product> {
    return await this.productRepository.updateEntity(id, product);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.productRepository.deleteEntity(id);
  }
}
