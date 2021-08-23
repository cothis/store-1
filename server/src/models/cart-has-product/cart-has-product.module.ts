import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartHasProductController } from './cart-has-product.controller';
import { CartHasProductRepository } from './cart-has-product.repository';
import { CartHasProductService } from './cart-has-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartHasProductRepository])],
  providers: [CartHasProductService],
  exports: [CartHasProductService],
  controllers: [CartHasProductController],
})
export class CartHasProductModule {}
