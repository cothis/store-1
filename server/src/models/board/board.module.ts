import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardController } from './board.controller';
import { RootConfigModule } from '@/config/config.module';

@Module({
  imports: [TypeOrmModule.forFeature(), RootConfigModule],
  providers: [BoardService, BoardRepository],
  exports: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
