import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderStatus } from './enums/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { EntityManager, getManager } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  private manager: EntityManager;
  constructor(private readonly orderService: OrderService) {
    this.manager = getManager();
  }

  @Get('/')
  async findAll(
    @Query('status', new DefaultValuePipe(OrderStatus.NULL), new ParseEnumPipe(OrderStatus)) status: OrderStatus,
  ): Promise<Order[]> {
    if (status === OrderStatus.NULL) status = undefined;

    return await this.orderService.findAll(status);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Order> {
    return await this.orderService.findById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() order: UpdateOrderDto): Promise<Order> {
    return await this.orderService.updateEntity(id, order, this.manager);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.orderService.deleteEntity(id);
  }

  @Post()
  async createOrder(@Body() newOrder: CreateOrderDto, @Req() req: Request) {
    const orders = await this.orderService.createOrder(newOrder, req.user.id);
    return { id: orders.id };
  }
}
