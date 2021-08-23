import { IsString } from 'class-validator';

export class CreateCartHasProductDto {
  @IsString()
  cartId: string;

  @IsString()
  productId: string;

  @IsString()
  quantity: number;
}
