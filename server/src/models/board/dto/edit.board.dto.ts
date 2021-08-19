import { IsString } from 'class-validator';

export class EditBoardDto {
  @IsString()
  title: string;
}
