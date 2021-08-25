import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import configuration from './configuration';
import { AppConfigService } from './app.service';
import { JwtConfigService } from './jwt.service';
import { AuthConfigService } from './auth-config.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigService, AppConfigService, JwtConfigService, AuthConfigService],
  exports: [AppConfigService, JwtConfigService, AuthConfigService],
})
export class RootConfigModule {}
