import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}
}
