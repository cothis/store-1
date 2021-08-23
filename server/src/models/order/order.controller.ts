import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<Order> {
    return await this.orderService.findById(id);
  }

  @Post('/')
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return await this.orderService.createEntity(dto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() order: Order): Promise<Order> {
    return await this.orderService.updateEntity(id, order);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.orderService.deleteEntity(id);
  }
}
