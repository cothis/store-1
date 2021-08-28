import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString, Max } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto {
  @IsString()
  id: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  senderName: string;

  @IsString()
  senderCall: string;

  @IsString()
  senderPhone: string;

  @IsString()
  senderMail: string;

  @IsString()
  receiverName: string;

  @IsString()
  receiverCall: string;

  @IsString()
  receiverPhone: string;

  @IsString()
  zipcode: string;

  @IsString()
  address: string;

  @IsString()
  addressDetail: string;

  @IsString()
  message: string;
}
