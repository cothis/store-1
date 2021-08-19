import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get accessSecret(): Buffer {
    const secret = this.configService.get<string>('jwt.secret.access');
    return Buffer.from(secret, 'base64');
  }

  get refreshSecret(): Buffer {
    const secret = this.configService.get<string>('jwt.secret.refresh');
    return Buffer.from(secret, 'base64');
  }
}
