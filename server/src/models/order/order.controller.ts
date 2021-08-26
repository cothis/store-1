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
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { OrderStatus } from './enums/order-status.enum';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
  async update(@Param('id') id: string, @Body() order: Partial<Order>): Promise<Order> {
    return await this.orderService.updateEntity(id, order);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.orderService.deleteEntity(id);
  }
}
