import { IsNumber, IsString } from 'class-validator';

export class CreateOrderHistoryDto {
  @IsString()
  orderId: string;
}
