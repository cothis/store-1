import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/models/order-history/entities/order-history.entity';

export class CreateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
