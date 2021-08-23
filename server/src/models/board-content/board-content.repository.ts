import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { BoardContent } from './entities/board-content.entity';

@EntityRepository(BoardContent)
export class BoardContentRepository extends Repository<BoardContent> {
  async findAll(): Promise<BoardContent[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<BoardContent> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createBoardContentDto: CreateBoardContentDto): Promise<BoardContent> {
    return await this.save(createBoardContentDto);
  }

  async updateEntity(id: string, boardContent: BoardContent): Promise<BoardContent> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...boardContent });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
