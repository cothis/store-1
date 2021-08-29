import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticConfigService {
  constructor(private configService: ConfigService) {}

  get node(): string {
    return this.configService.get<string>('elasticsearch.node');
  }

  get index(): string {
    return this.configService.get<string>('elasticsearch.index');
  }
}
