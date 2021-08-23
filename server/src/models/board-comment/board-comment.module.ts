import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCommentController } from './board-comment.controller';
import { BoardCommentRepository } from './board-comment.repository';
import { BoardContentService } from './board-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardCommentRepository])],
  providers: [BoardContentService],
  exports: [BoardContentService],
  controllers: [BoardCommentController],
})
export class BoardCommentModule {}
