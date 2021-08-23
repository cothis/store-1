import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoardContentService as BoardCommentService } from './board-comment.service';
import { CreateBoardConmmentDto } from './dto/create-board-comment.dto';
import { BoardComment } from './entities/board-comment.entity';

@Controller('api/v1/board-comments')
export class BoardCommentController {
  constructor(private readonly boardCommentService: BoardCommentService) {}

  @Get('/')
  async findAll(): Promise<BoardComment[]> {
    return await this.boardCommentService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<BoardComment> {
    return await this.boardCommentService.findById(id);
  }

  @Post('/')
  async create(@Body() createBoardCommentDto: CreateBoardConmmentDto): Promise<BoardComment> {
    return await this.boardCommentService.createEntity(createBoardCommentDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() boardComment: BoardComment): Promise<BoardComment> {
    return await this.boardCommentService.updateEntity(id, boardComment);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.boardCommentService.deleteEntity(id);
  }
}
