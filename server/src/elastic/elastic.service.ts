import { ElasticConfigService } from '@/config/elastic.service';
import { SearchResponse } from '@elastic/elasticsearch/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export interface ProductIdAndTitle {
  id: string;
  title: string;
}

@Injectable()
export class ElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async getProducts(keyword: string): Promise<ProductIdAndTitle[]> {
    const { body } = await this.elasticsearchService.search<SearchResponse<ProductIdAndTitle>>({
      index: 'store',
      body: {
        query: {
          fuzzy: {
            title: {
              value: keyword,
              fuzziness: 1,
            },
          },
        },
      },
    });
    return body.hits.hits.map((hit) => hit._source);
  }
}
