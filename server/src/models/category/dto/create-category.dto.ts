import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  parentId?: string;

  @IsString()
  name: string;
}
