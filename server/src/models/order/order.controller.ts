import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, OrderStatus } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { AuthUserRequest } from 'src/auth/auth-request.interface';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll(@Query('status') status: OrderStatus, @Req() req: AuthUserRequest): Promise<Order[]> {
    return await this.orderService.findAll({ status, userId: req.user.userId });
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Order> {
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
