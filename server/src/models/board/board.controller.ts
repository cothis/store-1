import { Request } from 'express';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResponseDto } from './dto/board-response.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { BoardContent } from './entities/board-content.entity';
import { ONE_PAGE_COUNT } from './board.repository';
import { ForAdmin } from '@/auth/decorators/for-admin.decorator';

@Controller('api/v1/boards')
@UseInterceptors(ClassSerializerInterceptor)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':slug')
  getBoard(
    @Param('slug') slug: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(ONE_PAGE_COUNT), ParseIntPipe) onePageCount: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({ slug, page, forProduct: false, onePageCount });
  }

  @ForAdmin()
  @Post(':slug/contents')
  @HttpCode(HttpStatus.CREATED)
  postBoardContent(
    @Param('slug') slug: string,
    @Body() content: CreateContentDto,
    @Req() req: Request,
  ): Promise<BoardContent> {
    return this.boardService.writeBoardContent(slug, req.user!.id, content);
  }
}
