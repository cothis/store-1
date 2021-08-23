import { IsString } from 'class-validator';

export class CreateBoardContentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  boardId: string;

  @IsString()
  userId: string;
}
