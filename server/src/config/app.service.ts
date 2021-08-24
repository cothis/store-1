import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
app:
  port: 8080 
  host: http://localhost:8080
*/
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get server(): string {
    return this.configService.get<string>('app.server');
  }

  get client(): string {
    return this.configService.get<string>('app.client');
  }
}
