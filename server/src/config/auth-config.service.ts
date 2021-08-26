import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get kakaoClientId(): string {
    return this.configService.get<string>('auth.kakao_client_id');
  }
}
