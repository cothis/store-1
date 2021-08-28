import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Board } from '@models/board/entities/board.entity';

import boardData from '../data/board.json';

interface IBoardSeed {
  slug: string;
  title: string;
  forProduct: boolean;
  commentable: boolean;
}

export default class CreateBoards implements Seeder {
  async run(_: Factory, connection: Connection): Promise<void> {
    const boards = boardData as IBoardSeed[];

    const count = await connection.getRepository(Board).count();
    if (count > 0) {
      return;
    }

    await connection.createQueryBuilder().insert().into(Board).values(boards).execute();
  }
}
