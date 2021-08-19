import { ModelEntity } from 'src/common/serializers/model.serializer';
import { IBoard } from '../interfaces/board.interface';

export const defaultGroup: string[] = ['default'];
export class BoardEntity extends ModelEntity implements IBoard {
  id: string;
  title?: string;
}
