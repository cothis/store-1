import { Exclude, Expose } from 'class-transformer';
import { BoardContent } from '../entities/board-content.entity';
import { Board } from '../entities/board.entity';

export class BoardResponseDto {
  @Exclude()
  board: Board;

  @Expose()
  get slug(): string {
    return this.board.slug;
  }

  @Expose()
  get title(): string {
    return this.board.title;
  }

  @Expose()
  get contents(): BoardContent[] {
    return this.board.contents;
  }

  currentPage: number;
  totalPage: number;
  totalCount: number;
}
