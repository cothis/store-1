import { IsNumber, IsString } from 'class-validator';

export class CreateOrderHasProduct {
  @IsString()
  orderId: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
