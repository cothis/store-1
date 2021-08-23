import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCommentRepository } from './board-comment.repository';
import { CreateBoardConmmentDto } from './dto/create-board-comment.dto';
import { BoardComment } from './entities/board-comment.entity';

@Injectable()
export class BoardContentService {
  constructor(
    @InjectRepository(BoardCommentRepository) private readonly boardCommentRepository: BoardCommentRepository,
  ) {}

  async findAll(): Promise<BoardComment[]> {
    return await this.boardCommentRepository.findAll();
  }

  async findById(id: string): Promise<BoardComment> {
    return await this.boardCommentRepository.findById(id);
  }

  async createEntity(createBoardCommentDto: CreateBoardConmmentDto): Promise<BoardComment> {
    return await this.boardCommentRepository.createEntity(createBoardCommentDto);
  }

  async updateEntity(id: string, boardComment: BoardComment): Promise<BoardComment> {
    return await this.boardCommentRepository.updateEntity(id, boardComment);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.boardCommentRepository.deleteEntity(id);
  }
}
