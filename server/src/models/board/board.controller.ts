import { Controller } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('api/v1/boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
}
