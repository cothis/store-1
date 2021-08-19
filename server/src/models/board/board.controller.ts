import {
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { BoardByIdPipe } from 'src/common/pipes/models/board-entity.pipe';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create.board.dto';
import { EditBoardDto } from './dto/edit.board.dto';
import { BoardEntity } from './serializers/board.serializer';
import { defaultGroup } from './serializers/board.serializer';

@Controller('api/boards')
@SerializeOptions({ groups: defaultGroup })
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<BoardEntity[]> {
    return await this.boardService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(@Param() id: string): Promise<BoardEntity> {
    return await this.boardService.get(id);
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateBoardDto): Promise<BoardEntity> {
    return await this.boardService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id', BoardByIdPipe) board: BoardEntity, @Body() inputs: EditBoardDto): Promise<BoardEntity> {
    return await this.boardService.update(board, inputs);
  }
}
