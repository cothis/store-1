import { IsString } from 'class-validator';

export class CreateBoardConmmentDto {
  @IsString()
  content: string;

  @IsString()
  userId: string;

  @IsString()
  boardContentId: string;
}
