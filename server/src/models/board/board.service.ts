import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardEntity } from './serializers/board.serializer';
import { CreateBoardDto } from './dto/create.board.dto';
import { EditBoardDto } from './dto/edit.board.dto';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(BoardRepository) private readonly boardRepository: BoardRepository) {}

  async get(id: string, relations: string[] = [], throwsException = false): Promise<BoardEntity | null> {
    return await this.boardRepository.get(id, relations, throwsException);
  }

  async findAll(relations: string[] = [], throwsException = false): Promise<BoardEntity[] | null> {
    return await this.boardRepository.findAll(relations, throwsException);
  }

  async create(inputs: CreateBoardDto): Promise<BoardEntity> {
    return await this.boardRepository.createEntity(inputs);
  }

  async update(board: BoardEntity, inputs: EditBoardDto): Promise<BoardEntity> {
    return await this.boardRepository.updateEntity(board, inputs);
  }
}
