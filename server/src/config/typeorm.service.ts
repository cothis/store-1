import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/*  
typeorm:
  url: localhost
  port: 3306
  database: store
  username: woowa
  password: woowa
  synchonize: true
  logging: true
 */
@Injectable()
export class TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('typeorm.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('typeorm.port'));
  }

  get database(): string {
    return this.configService.get<string>('typeorm.database');
  }

  get username(): string {
    return this.configService.get<string>('typeorm.username');
  }

  get password(): string {
    return this.configService.get<string>('typeorm.password');
  }

  get synchronize(): boolean {
    return Boolean(this.configService.get<boolean>('typeorm.synchronize'));
  }

  get logging(): boolean {
    return Boolean(this.configService.get<boolean>('typeorm.logging'));
  }
}
