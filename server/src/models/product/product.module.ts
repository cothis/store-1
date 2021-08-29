import { CategoryRepository } from '@models/category/category.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { RootConfigModule } from 'src/config/config.module';
import { BoardModule } from '../board/board.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { AppConfigService } from '@/config/app.service';
import { ElasticModule } from '@/elastic/elastic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, CategoryRepository]),
    RootConfigModule,
    BoardModule,
    ElasticModule,
  ],
  providers: [ProductService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
