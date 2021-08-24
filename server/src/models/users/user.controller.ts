import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request) {
    const userId = (req.user as { userId: string }).userId;
    const user = await this.userService.findById(userId);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get('/')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
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
