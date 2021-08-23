import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('api/v1/carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  async findAll(): Promise<Cart[]> {
    return await this.cartService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: string): Promise<Cart> {
    return await this.cartService.findById(id);
  }

  @Post('/')
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartService.createEntity(createCartDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() cart: Cart): Promise<Cart> {
    return await this.cartService.updateEntity(id, cart);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.cartService.deleteEntity(id);
  }
}
