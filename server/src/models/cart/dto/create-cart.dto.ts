import { IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  userId: string;
}
