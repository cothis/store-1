import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RootConfigModule } from './config/config.module';
import { MySqlDatabaseProviderModule } from './providers/database/mysql/provider.module';
import { BoardModule } from './models/board/board.module';
import { BoardContentModule } from './models/board-content/board-content.module';
import { BoardCommentModule } from './models/board-comment/board-comment.module';
import { CartModule } from './models/cart/cart.module';
import { CartHasProductModule } from './models/cart-has-product/cart-has-product.module';
import { CategoryModule } from './models/category/category.module';
import { OrderModule } from './models/order/order.module';
import { OrderHasProductModule } from './models/order-has-product/order-has-product.module';
import { OrderHistoryModule } from './models/order-history/order-history.module';
import { ProductModule } from './models/product/product.module';
import { ReviewModule } from './models/review/review.module';
import { UserModule } from './models/users/user.module';

@Module({
  imports: [
    RootConfigModule,
    MySqlDatabaseProviderModule,
    BoardModule,
    BoardContentModule,
    BoardCommentModule,
    CartModule,
    CartHasProductModule,
    CategoryModule,
    OrderModule,
    OrderHasProductModule,
    OrderHistoryModule,
    ProductModule,
    ReviewModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
