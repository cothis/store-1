import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartHasProductService } from './cart-has-product.service';
import { CreateCartHasProductDto } from './dto/create-cart-has-product.dto';
import { CartHasProduct } from './entities/cart-has-product.entity';

@Controller('api/v1/cart-has-products')
export class CartHasProductController {
  constructor(private readonly cartHasProductService: CartHasProductService) {}

  @Get('/')
  async findAll(): Promise<CartHasProduct[]> {
    return await this.cartHasProductService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<CartHasProduct> {
    return await this.cartHasProductService.findById(id);
  }

  @Post('/')
  async create(@Body() createCartHasProductDto: CreateCartHasProductDto): Promise<CartHasProduct> {
    return await this.cartHasProductService.createEntity(createCartHasProductDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() cartHasProduct: CartHasProduct): Promise<CartHasProduct> {
    return await this.cartHasProductService.updateEntity(id, cartHasProduct);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.cartHasProductService.deleteEntity(id);
  }
}
