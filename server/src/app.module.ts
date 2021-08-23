import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RootConfigModule } from './config/config.module';
import { MySqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
import { BoardModule } from './models/board/board.module';
import { BoardContentModule } from './models/board-content/board-content.module';

@Module({
  imports: [RootConfigModule, MySqlDatabaseProviderModule, BoardModule, BoardContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
