import { IsBoolean } from 'class-validator';

export class LikeDto {
  productId: string;

  @IsBoolean()
  like: boolean;
}
