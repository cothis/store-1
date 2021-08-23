import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardContentRepository } from './board-content.repository';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { BoardContent } from './entities/board-content.entity';

@Injectable()
export class BoardContentService {
  constructor(
    @InjectRepository(BoardContentRepository) private readonly boardContentRepository: BoardContentRepository,
  ) {}

  async findAll(): Promise<BoardContent[]> {
    return await this.boardContentRepository.findAll();
  }

  async findById(id: string): Promise<BoardContent> {
    return await this.boardContentRepository.findById(id);
  }

  async createEntity(createBoardContentDto: CreateBoardContentDto): Promise<BoardContent> {
    return await this.boardContentRepository.createEntity(createBoardContentDto);
  }

  async updateEntity(id: string, boardContent: BoardContent): Promise<BoardContent> {
    return await this.boardContentRepository.updateEntity(id, boardContent);
  }

  async deleteEntity(id: string): Promise<boolean> {
    return await this.boardContentRepository.deleteEntity(id);
  }
}
