import { Controller, Get } from '@nestjs/common';
import { AGREEMENT_STRING, PRIVACY_STRING } from '@/data/terms';

@Controller('api/v1')
export class AppController {
  @Get('agreement')
  agreement(): string {
    return AGREEMENT_STRING;
  }

  @Get('privacy')
  privacy(): string {
    return PRIVACY_STRING;
  }
}
