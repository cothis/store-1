import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<Product> {
    return await this.productService.findById(id);
  }

  @Post('/')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.createEntity(createProductDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return await this.productService.updateEntity(id, product);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.productService.deleteEntity(id);
  }
}
