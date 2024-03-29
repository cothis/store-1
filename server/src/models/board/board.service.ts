import { AppConfigService } from '@/config/app.service';
import { attachPath } from '@/utils';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../product/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { BoardRepository, ONE_PAGE_COUNT } from './board.repository';
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
    slug: string;
    onePageCount?: number;
    page?: number;
    productId?: string;
    userId?: string;
    forProduct: boolean;
  }): Promise<BoardResponseDto> {
    const { slug, forProduct = false } = options;
    let { page = 1, onePageCount = ONE_PAGE_COUNT } = options;

    const board = await this.boardRepository.findBoard(slug, forProduct);
    if (!board) {
      throw new NotFoundException('해당 게시판은 존재하지 않습니다.');
    }

    if (page < 1) {
      page = 1;
    }
    if (onePageCount < 1) {
      onePageCount = ONE_PAGE_COUNT;
    }
    const [contents, count] = await this.boardRepository.findBoardContentAndCount({
      boardId: board.id,
      onePageCount,
      page,
      ...options,
    });
    contents.forEach((content) => {
      if (content.product) {
        content.product.image = attachPath(this.s3, content.product.image);
      }
    });
    board.contents = contents;

    const response = new BoardResponseDto();
    response.board = board;
    response.totalCount = count;
    response.totalPage = Math.ceil(count / onePageCount);
    response.currentPage = count < onePageCount ? 1 : page;

    return response;
  }

  async writeBoardContent(
    slug: string,
    userId: string,
    createContent: CreateContentDto,
    productId?: string,
  ): Promise<BoardContent> {
    const board = await this.boardRepository.findBoard(slug, !!productId);
    if (!board) {
      throw new NotFoundException('해당 게시판은 존재하지 않습니다.');
    }

    const boardContent = new BoardContent();
    boardContent.board = board;
    if (productId) {
      boardContent.product = { id: productId } as Product;
    }
    boardContent.user = { id: userId } as User;
    boardContent.content = createContent.content;
    boardContent.title = createContent.title;

    return this.boardRepository.saveBoardContent(boardContent);
  }

  async editBoardContent(contentId: string, userId: string, createContent: CreateContentDto): Promise<BoardContent> {
    // 게시물 존재 확인
    const content = await this.boardRepository.findBoardContentByIdWithUser(contentId);
    if (!content) {
      throw new NotFoundException('해당 게시물이 존재하지 않습니다.');
    }
    // 게시물 주인인지 확인
    if (content.user.id !== userId) {
      throw new ForbiddenException('해당 게시물에 권한이 없습니다.');
    }
    // 게시물 수정
    content.title = createContent.title;
    content.content = createContent.content;
    return this.boardRepository.saveBoardContent(content);
  }

  async deleteBoardContent(contentId: string, userId: string): Promise<void> {
    // 게시물 존재 확인
    const content = await this.boardRepository.findBoardContentByIdWithUser(contentId);
    if (!content) {
      throw new NotFoundException('해당 게시물이 존재하지 않습니다.');
    }
    // 게시물 주인인지 확인
    if (content.user.id !== userId) {
      throw new ForbiddenException('해당 게시물에 권한이 없습니다.');
    }
    // 게시물 삭제
    await this.boardRepository.deleteBoardContent(content);
  }
}
