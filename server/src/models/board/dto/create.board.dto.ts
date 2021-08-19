import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  readonly title: string;
}
