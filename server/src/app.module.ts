import { Module } from '@nestjs/common';

import { RootConfigModule } from './config/config.module';
import { MySqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
import { BoardModule } from './models/board/board.module';
import { CategoryModule } from './models/category/category.module';
import { OrderModule } from './models/order/order.module';
import { ProductModule } from './models/product/product.module';
import { UserModule } from './models/users/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    RootConfigModule,
    MySqlDatabaseProviderModule,
    BoardModule,
    CategoryModule,
    OrderModule,
    ProductModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
