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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '@/auth/jwt.guard';

import { ProductService } from './product.service';
import { BoardService } from '../board/board.service';

import { ProductListPage } from './dto/product-list-page.dto';
import { MainBlock } from './dto/main-block.dto';
import { BoardResponseDto } from '../board/dto/board-response.dto';
import { CreateContentDto } from '../board/dto/create-content.dto';

import { SortType } from './enums/sort-type.enum';

import { Product } from './entities/product.entity';
import { BoardContent } from '../board/entities/board-content.entity';
import { ONE_PAGE_COUNT } from '../board/board.repository';
import { ProductIdAndTitle } from '@/elastic/elastic.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly boardService: BoardService) {}

  @Get()
  search(
    @Query('categoryId') categoryId: string,
    @Query('keyword') keyword: string,
    @Query('sort', new DefaultValuePipe(SortType.LATEST), new ParseEnumPipe(SortType)) sort: SortType,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<ProductListPage> {
    return this.productService.search(categoryId, keyword, sort, page);
  }

  @Get('main')
  main(): Promise<MainBlock[]> {
    return this.productService.getMain();
  }

  @Get(':id')
  @SerializeOptions({ groups: ['detail'] })
  get(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/like')
  putLike(@Param('id') id: string): Promise<void> {
    return;
  }

  @Get(':id/reviews')
  getReviews(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(ONE_PAGE_COUNT), ParseIntPipe) onePageCount: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({ slug: 'review', productId: id, page, forProduct: true, onePageCount });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reviews')
  @HttpCode(HttpStatus.CREATED)
  postReview(@Param('id') id: string, @Body() review: CreateContentDto, @Req() req: Request): Promise<BoardContent> {
    return this.boardService.writeBoardContent('review', req.user!.id, review, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reviews/:reviewId')
  putReview(
    @Param('reviewId') reviewId: string,
    @Body() review: CreateContentDto,
    @Req() req: Request,
  ): Promise<BoardContent> {
    return this.boardService.editBoardContent(reviewId, req.user!.id, review);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post(':id/questions')
  @HttpCode(HttpStatus.CREATED)
  postQuestion(
    @Param('id') id: string,
    @Body() question: CreateContentDto,
    @Req() req: Request,
  ): Promise<BoardContent> {
    return this.boardService.writeBoardContent('question', req.user!.id, question, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/questions/:questionId')
  putQuestion(
    @Param('questionId') questionId: string,
    @Body() question: CreateContentDto,
    @Req() req: Request,
  ): Promise<BoardContent> {
    return this.boardService.editBoardContent(questionId, req.user!.id, question);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/questions/:questionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteQuestion(@Param('questionId') questionId: string, @Req() req: Request): Promise<void> {
    return this.boardService.deleteBoardContent(questionId, req.user!.id);
  }

  @Get('/keywords')
  getKeywords(@Param('query') query: string): Promise<ProductIdAndTitle[]> {
    return this.productService.getKeywords(query);
  }
}
