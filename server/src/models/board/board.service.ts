import { AppConfigService } from '@/config/app.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import path from 'path';
import { Product } from '../product/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { BoardRepository, ONE_PAGE_COUNT, ProductBoardSlug } from './board.repository';
import { BoardResponseDto } from './dto/board-response.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { BoardContent } from './entities/board-content.entity';

@Injectable()
export class BoardService {
  private s3: string;
  constructor(private readonly boardRepository: BoardRepository, readonly appConfigService: AppConfigService) {
    this.s3 = appConfigService.s3;
  }

  async getProductBoard(options: {
    slug: ProductBoardSlug;
    page?: number;
    productId?: string;
    userId?: string;
  }): Promise<BoardResponseDto> {
    const { slug, productId, userId } = options;
    let { page = 1 } = options;

    const board = await this.boardRepository.findProductBoard(options.slug);
    if (!board) {
      throw new NotFoundException('해당 게시판은 존재하지 않습니다.');
    }

    if (options.page < 1) {
      options.page = 1;
    }
    const [contents, count] = await this.boardRepository.findProductBoardContentAndCount({
      boardId: board.id,
      ...options,
    });
    contents.forEach((content) => {
      if (content.product) {
        content.product.image = path.join(this.s3, content.product.image);
      }
    });
    board.contents = contents;

    const response = new BoardResponseDto();
    response.board = board;
    response.totalCount = count;
    response.totalPage = Math.ceil(count / ONE_PAGE_COUNT);
    response.currentPage = count < ONE_PAGE_COUNT ? 1 : page;

    return response;
  }

  async writeProductBoardContent(
    slug: ProductBoardSlug,
    productId: string,
    createContent: CreateContentDto,
    userId: string,
  ): Promise<void> {
    const board = await this.boardRepository.findProductBoard(slug);
    if (!board) {
      throw new NotFoundException('해당 게시판은 존재하지 않습니다.');
    }

    const boardContent = new BoardContent();
    boardContent.board = board;
    boardContent.product = { id: productId } as Product;
    boardContent.user = { id: userId } as User;
    boardContent.content = createContent.content;
    boardContent.title = createContent.title;

    await this.boardRepository.saveBoardContent(boardContent);
  }
}
