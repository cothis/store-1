import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHasProductController } from './order-has-product.controller';
import { OrderHasProductRepository } from './order-has-product.repository';
import { OrderHasProductService } from './order-has-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHasProductRepository])],
  providers: [OrderHasProductService],
  exports: [OrderHasProductService],
  controllers: [OrderHasProductController],
})
export class OrderHasProductModule {}
