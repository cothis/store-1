import { Injectable, Query } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BoardContent } from './entities/board-content.entity';
import { Board } from './entities/board.entity';

export const ONE_PAGE_COUNT = 12;

@Injectable()
export class BoardRepository {
  constructor(private connection: Connection) {}

  async findBoardContentAndCount(options: {
    boardId: string;
    page: number;
    onePageCount: number;
    productId?: string;
    userId?: string;
  }): Promise<[BoardContent[], number]> {
    const { boardId, productId, userId, onePageCount } = options;
    let { page } = options;

    let countQuery = this.connection
      .getRepository(BoardContent)
      .createQueryBuilder('content')
      .leftJoin('content.board', 'board')
      .where('content.board_id = :boardId', { boardId });

    if (productId) {
      countQuery = countQuery.leftJoin('content.product', 'product').andWhere('product.id = :productId', { productId });
    }
    if (userId) {
      countQuery = countQuery.leftJoin('content.user', 'user').andWhere('user.id = :userId', { userId });
    }

    const count = await countQuery.getCount();

    if (count < onePageCount && page > 1) {
      page = 1;
    }

    let contentQuery = this.connection
      .getRepository(BoardContent)
      .createQueryBuilder('content')
      .leftJoin('content.board', 'board')
      .leftJoinAndSelect('content.user', 'user')
      .leftJoinAndSelect('content.comments', 'comment')
      .where('content.board_id = :boardId', { boardId });

    if (productId) {
      if (userId) {
        contentQuery = contentQuery.leftJoinAndSelect('content.product', 'product');
      } else {
        contentQuery = contentQuery.leftJoin('content.product', 'product');
      }
      contentQuery = contentQuery.andWhere('product.id = :productId', { productId });
    }
    if (userId) {
      contentQuery = contentQuery.andWhere('user.id = :userId', { userId });
    }

    const contents = await contentQuery
      .offset(onePageCount * (page - 1))
      .limit(onePageCount)
      .orderBy('content.id', 'DESC')
      .getMany();

    return [contents, count];
  }

  findBoard(slug: string, forProduct: boolean): Promise<Board> {
    return this.connection
      .getRepository(Board)
      .createQueryBuilder('board')
      .where('board.slug = :slug', { slug })
      .andWhere('board.forProduct = :forProduct', { forProduct })
      .getOne();
  }

  saveBoardContent(boardContent: BoardContent): Promise<BoardContent> {
    return this.connection.getRepository(BoardContent).save(boardContent);
  }
}
