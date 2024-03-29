import { IsNotEmpty, IsNumber, IsNumberString, IsPositive, Max } from 'class-validator';

export class ProductIdWithQuantity {
  @IsNumberString()
  id: string;

  @IsNumber({ allowNaN: false })
  @IsPositive()
  @Max(100)
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  products: ProductIdWithQuantity[];
}
