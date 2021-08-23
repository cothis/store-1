import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoardContentService } from './board-content.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { BoardContent } from './entities/board-content.entity';

@Controller('api/v1/board-contents')
export class BoardContentController {
  constructor(private readonly boardContentService: BoardContentService) {}

  @Get('/')
  async findAll(): Promise<BoardContent[]> {
    return await this.boardContentService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<BoardContent> {
    return await this.boardContentService.findById(id);
  }

  @Post('/')
  async create(@Body() createBoardContentDto: CreateBoardContentDto): Promise<BoardContent> {
    return await this.boardContentService.createEntity(createBoardContentDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() boardContent: BoardContent): Promise<BoardContent> {
    return await this.boardContentService.updateEntity(id, boardContent);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.boardContentService.deleteEntity(id);
  }
}
