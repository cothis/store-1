import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

  get s3(): string {
    return this.configService.get<string>('app.s3');
  }

  get elasticsearch(): string {
    return this.configService.get<string>('app.elasticsearch');
  }
}
