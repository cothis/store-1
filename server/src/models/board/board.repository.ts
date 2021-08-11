import { classToPlain, plainToClass } from 'class-transformer';
import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import { Board } from './entities/board.entity';
import { BoardEntity } from './serializers/board.serializer';

@EntityRepository(Board)
export class BoardRepository extends ModelRepository<Board, BoardEntity> {
  transform(model: Board): BoardEntity {
    return plainToClass(BoardEntity, classToPlain(model, {}), {});
  }

  transformMany(models: Board[]): BoardEntity[] {
    return models.map((model) => this.transform(model));
  }
}
