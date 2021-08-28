import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootConfigModule } from 'src/config/config.module';
import { ProductModule } from '../product/product.module';
import { PriceService } from './price.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository]), RootConfigModule, ProductModule],
  providers: [OrderService, PriceService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
