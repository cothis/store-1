import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { RootConfigModule } from 'src/config/config.module';
import { TypeOrmConfigService } from 'src/config/typeorm.service';

const optionFactory = async (config: TypeOrmConfigService) => ({
  type: 'mysql' as DatabaseType,
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: ['dist/**/*.entity.{ts,js}'],
  synchronize: config.synchronize,
  logging: config.logging,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [RootConfigModule],
      useFactory: optionFactory,
      inject: [TypeOrmConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class MySqlDatabaseProviderModule {}
