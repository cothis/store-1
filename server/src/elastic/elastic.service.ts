import { SearchResponse } from '@elastic/elasticsearch/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { elasticOption } from './elastic.search.option';

export interface ProductIdAndTitle {
  id: string;
  title: string;
}

@Injectable()
export class ElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async getProducts(keyword: string): Promise<ProductIdAndTitle[]> {
    const { body } = await this.elasticsearchService.search<SearchResponse<ProductIdAndTitle>>(elasticOption(keyword));
    return body.hits.hits.map((hit) => hit._source);
  }
}
