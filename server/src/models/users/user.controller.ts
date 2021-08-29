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
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { BoardResponseDto } from '../board/dto/board-response.dto';
import { BoardService } from '../board/board.service';
import { ONE_PAGE_COUNT } from '../board/board.repository';
import { ONE_PAGE_COUNT as PRODUCT_ONE_PAGE_COUNT } from '@/models/product/product.repository';
import { ProductListPageDto } from '../product/dto/product-list-page.dto';
import { ProductService } from '../product/product.service';
import { ForUser } from '@/auth/decorators/for-user.decorator';

@Controller('api/v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly productService: ProductService,
  ) {}

  @ForUser()
  @SerializeOptions({ groups: ['me'] })
  @Get('/me')
  async getMe(@Req() req: Request): Promise<User> {
    const userId = req.user.id;
    const user = await this.userService.findById(userId);
    return user;
  }

  @ForUser()
  @Get('me/reviews')
  @SerializeOptions({ groups: ['product'] })
  async getMyReviews(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(ONE_PAGE_COUNT), ParseIntPipe) onePageCount: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({
      slug: 'review',
      page,
      userId: req.user!.id,
      forProduct: true,
      onePageCount,
    });
  }

  @ForUser()
  @Get('me/questions')
  @SerializeOptions({ groups: ['product'] })
  async getMyQuestions(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(ONE_PAGE_COUNT), ParseIntPipe) onePageCount: number,
  ): Promise<BoardResponseDto> {
    return this.boardService.getProductBoard({
      slug: 'question',
      page,
      userId: req.user!.id,
      forProduct: true,
      onePageCount,
    });
  }

  @ForUser()
  @Get('me/likes')
  @SerializeOptions({ groups: ['product'] })
  async getMyLikes(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('onePageCount', new DefaultValuePipe(PRODUCT_ONE_PAGE_COUNT), ParseIntPipe) onePageCount: number,
  ): Promise<ProductListPageDto> {
    return this.productService.getUsersLike({ userId: req.user!.id, page, onePageCount });
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
