import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateBoardConmmentDto } from './dto/create-board-comment.dto';
import { BoardComment } from './entities/board-comment.entity';

@EntityRepository(BoardComment)
export class BoardCommentRepository extends Repository<BoardComment> {
  async findAll(): Promise<BoardComment[] | null> {
    return await this.find();
  }

  async findById(id: string): Promise<BoardComment> {
    return await this.findOneOrFail({ where: { id } });
  }

  async createEntity(createBoardCommentDto: CreateBoardConmmentDto): Promise<BoardComment> {
    return await this.save(createBoardCommentDto);
  }

  async updateEntity(id: string, boardComment: BoardComment): Promise<BoardComment> {
    const entity = this.findById(id);
    return await this.save({ ...entity, ...boardComment });
  }

  async deleteEntity(id: string): Promise<boolean> {
    return (await this.delete(id)).affected > 0;
  }
}
