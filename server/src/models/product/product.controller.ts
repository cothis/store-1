import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { ForUser } from '@/auth/decorators/for-user.decorator';
import { ProductService } from './product.service';
import { BoardService } from '../board/board.service';
import { ProductIdAndTitle } from '@/elastic/elastic.service';

import { ONE_PAGE_COUNT } from '../board/board.repository';

import { ProductListPageDto } from './dto/product-list-page.dto';
import { MainBlock } from './dto/main-block.dto';
import { BoardResponseDto } from '../board/dto/board-response.dto';
import { CreateContentDto } from '../board/dto/create-content.dto';
import { LikeDto } from './dto/like.dto';

import { SortType } from './enums/sort-type.enum';

import { Product } from './entities/product.entity';
import { BoardContent } from '../board/entities/board-content.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly boardService: BoardService) {}

  @Get('keywords')
  getKeywords(@Query('query') query: string): Promise<ProductIdAndTitle[]> {
    return this.productService.getKeywords(query);
  }

  @Get()
  search(
    @Query('categoryId') categoryId: string,
    @Query('keyword') keyword: string,
    @Query('sort', new DefaultValuePipe(SortType.LATEST), new ParseEnumPipe(SortType)) sort: SortType,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<ProductListPageDto> {
    return this.productService.search(categoryId, keyword, sort, page);
  }

  @Get('main')
  main(): Promise<MainBlock[]> {
    return this.productService.getMain();
  }

  @Get(':id')
  @SerializeOptions({ groups: ['detail'] })
  get(@Param('id') id: string, @Req() req: Request): Promise<Product> {
    return this.productService.getById(id, req.user?.id);
  }

  @ForUser()
  @Put(':id/like')
  putLike(@Param('id') id: string, @Body() like: LikeDto, @Req() req: Request): Promise<LikeDto> {
    like.productId = id;
    return this.productService.like(like, req.user!.id);
  }

  @Get(':id/reviews')
  getReviews(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(ONE_PAGE_COUNT), ParseIntPipe) onePageCount: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({ slug: 'review', productId: id, page, forProduct: true, onePageCount });
  }

  @ForUser()
  @Post(':id/reviews')
  @HttpCode(HttpStatus.CREATED)
  postReview(@Param('id') id: string, @Body() review: CreateContentDto, @Req() req: Request): Promise<BoardContent> {
    return this.boardService.writeBoardContent('review', req.user!.id, review, id);
  }

  @ForUser()
  @Put(':id/reviews/:reviewId')
  putReview(
    @Param('reviewId') reviewId: string,
    @Body() review: CreateContentDto,
    @Req() req: Request,
  ): Promise<BoardContent> {
    return this.boardService.editBoardContent(reviewId, req.user!.id, review);
  }

  @ForUser()
  @Delete(':id/reviews/:reviewId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReview(@Param('reviewId') reviewId: string, @Req() req: Request): Promise<void> {
    return this.boardService.deleteBoardContent(reviewId, req.user!.id);
  }

  @Get(':id/questions')
  @SerializeOptions({ groups: ['comment'] })
  getQuestions(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(ONE_PAGE_COUNT), ParseIntPipe) onePageCount: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({ slug: 'question', productId: id, page, forProduct: true, onePageCount });
  }

  @ForUser()
  @Post(':id/questions')
  @HttpCode(HttpStatus.CREATED)
  postQuestion(
    @Param('id') id: string,
    @Body() question: CreateContentDto,
    @Req() req: Request,
  ): Promise<BoardContent> {
    return this.boardService.writeBoardContent('question', req.user!.id, question, id);
  }

  @ForUser()
  @Put(':id/questions/:questionId')
  putQuestion(
    @Param('questionId') questionId: string,
    @Body() question: CreateContentDto,
    @Req() req: Request,
  ): Promise<BoardContent> {
    return this.boardService.editBoardContent(questionId, req.user!.id, question);
  }

  @ForUser()
  @Delete(':id/questions/:questionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteQuestion(@Param('questionId') questionId: string, @Req() req: Request): Promise<void> {
    return this.boardService.deleteBoardContent(questionId, req.user!.id);
  }
}
