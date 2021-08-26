import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Put, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderStatus } from './enums/order-status.enum';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  async findAll(
    @Query('status', new ParseEnumPipe(OrderStatus)) status: OrderStatus,
    @Req() req: Request,
  ): Promise<Order[]> {
    return await this.orderService.findAll({ status, userId: req.user.id });
  }

  @Get('/:id')
  async findById(
    @Param('id') id: string,
    @Query('status', new ParseEnumPipe(OrderStatus)) status: OrderStatus,
    @Req() req: Request,
  ): Promise<Order> {
    return await this.orderService.findById(id);
  }

  // @Post('/')
  // async create(@Body() dto: CreateOrderDto): Promise<Order> {
  //   return await this.orderService.createEntity(dto);
  // }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() order: Partial<Order>): Promise<Order> {
    return await this.orderService.updateEntity(id, order);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.orderService.deleteEntity(id);
  }
}
