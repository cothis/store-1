import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { BoardResponseDto } from '../board/dto/board-response.dto';
import { BoardService } from '../board/board.service';

@Controller('api/v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService, private readonly boardService: BoardService) {}

  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: ['me'] })
  @Get('/me')
  async getMe(@Req() req: Request): Promise<User> {
    const userId = req.user.id;
    const user = await this.userService.findById(userId);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/reviews')
  @SerializeOptions({ groups: ['product'] })
  async getMyReviews(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({ slug: 'review', page, userId: req.user!.id, forProduct: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/questions')
  @SerializeOptions({ groups: ['product'] })
  async getMyQuestions(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({ slug: 'question', page, userId: req.user!.id, forProduct: true });
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createEntity(createUserDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.userService.updateEntity(id, user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.userService.deleteEntity(id);
  }
}
