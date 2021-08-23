import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderHasProductService } from './order-has-product.service';
import { CreateOrderHasProduct } from './dto/create-order-has-product.dto';
import { OrderHasProduct } from './entities/order-has-product.entity';

@Controller('api/v1/order-has-products')
export class OrderHasProductController {
  constructor(private readonly orderHasProductService: OrderHasProductService) {}

  @Get('/')
  async findAll(): Promise<OrderHasProduct[]> {
    return await this.orderHasProductService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<OrderHasProduct> {
    return await this.orderHasProductService.findById(id);
  }

  @Post('/')
  async create(@Body() createOrderHasProductDto: CreateOrderHasProduct): Promise<OrderHasProduct> {
    return await this.orderHasProductService.createEntity(createOrderHasProductDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() orderHasProduct: OrderHasProduct): Promise<OrderHasProduct> {
    return await this.orderHasProductService.updateEntity(id, orderHasProduct);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.orderHasProductService.deleteEntity(id);
  }
}
