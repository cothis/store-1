import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository])],
  providers: [CartService],
  exports: [CartService],
  controllers: [CartController],
})
export class CartModule {}
