import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardContentController } from './board-content.controller';
import { BoardContentRepository } from './board-content.repository';
import { BoardContentService } from './board-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardContentRepository])],
  providers: [BoardContentService],
  exports: [BoardContentService],
  controllers: [BoardContentController],
})
export class BoardContentModule {}
