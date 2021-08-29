import { CategoryRepository } from '@models/category/category.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { RootConfigModule } from 'src/config/config.module';
import { AppConfigService } from '@/config/app.service';
import { ElasticConfigService } from '@/config/elastic.service';
import { ElasticService } from './elastic.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [RootConfigModule],
      useFactory: async (elasticConfigService: ElasticConfigService) => ({
        node: elasticConfigService.node,
      }),
      inject: [ElasticConfigService],
    }),
    RootConfigModule,
  ],
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {}
