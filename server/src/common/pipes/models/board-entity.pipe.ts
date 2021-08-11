import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardEntity } from 'src/models/board/serializers/board.serializer';

export class BoardByIdPipe implements PipeTransform<string, BoardEntity> {
  transform(value: string, metadata: ArgumentMetadata): BoardEntity {
    if (value === undefined) throw new BadRequestException('Validation failed');

    const board = new BoardEntity();
    board.id = value;
    return board;
  }
}
