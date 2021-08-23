import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderHistoryService } from './order-history.service';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { OrderHistory } from './entities/order-history.entity';

@Controller('api/v1/order-histories')
export class OrderHistoryController {
  constructor(private readonly orderHistoryService: OrderHistoryService) {}

  @Get('/')
  async findAll(): Promise<OrderHistory[]> {
    return await this.orderHistoryService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<OrderHistory> {
    return await this.orderHistoryService.findById(id);
  }

  @Post('/')
  async create(@Body() createOrderHistoryDto: CreateOrderHistoryDto): Promise<OrderHistory> {
    return await this.orderHistoryService.createEntity(createOrderHistoryDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() orderHistory: OrderHistory): Promise<OrderHistory> {
    return await this.orderHistoryService.updateEntity(id, orderHistory);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.orderHistoryService.deleteEntity(id);
  }
}
