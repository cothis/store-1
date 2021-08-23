import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistoryController } from './order-history.controller';
import { OrderHistoryRepository } from './order-history.repository';
import { OrderHistoryService } from './order-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistoryRepository])],
  providers: [OrderHistoryService],
  exports: [OrderHistoryService],
  controllers: [OrderHistoryController],
})
export class OrderHistoryModule {}
