import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardController } from './board.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  providers: [BoardService],
  exports: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
