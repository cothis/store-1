import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
app:
  port: 8080 
*/
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
}
