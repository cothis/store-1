import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  productId: string;

  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  images?: string;
}
