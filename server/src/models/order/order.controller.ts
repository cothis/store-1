import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { ForUser } from '@/auth/decorators/for-user.decorator';
import { ONE_PAGE_COUNT } from './order.repository';
import { OrderWithPage } from './dto/order-with-page.dto';

@ForUser()
@Controller('api/v1/orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  async findAll(
    @Query('status', new DefaultValuePipe(OrderStatus.NULL), new ParseEnumPipe(OrderStatus)) status: OrderStatus,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(ONE_PAGE_COUNT), ParseIntPipe) pageSize: number,
  ): Promise<OrderWithPage> {
    if (status === OrderStatus.NULL) status = undefined;

    return await this.orderService.findAll(page, pageSize, status);
  }

  @Get('/:id')
  async findById(@Param('id') id: string, @Query('status') status: OrderStatus): Promise<Order> {
    return await this.orderService.findById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() order: UpdateOrderDto): Promise<Order> {
    return await this.orderService.updateEntity(id, order);
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
