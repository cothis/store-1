import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductTag } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  thumbnails?: string;

  @IsString()
  price: string;

  @IsString()
  content?: string;

  @IsEnum(ProductTag)
  tags?: ProductTag[];
}
