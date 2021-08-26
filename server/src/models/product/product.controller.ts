import {
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';

import { ProductListPage } from './dto/product-list-page.dto';
import { SortType } from './enums/sort-type.enum';
import { Product } from './entities/product.entity';
import { MainBlock } from './dto/main-block.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  search(
    @Query('categoryId') categoryId: string,
    @Query('keyword') keyword: string,
    @Query('sort', new DefaultValuePipe(SortType.LATEST), new ParseEnumPipe(SortType)) sort: SortType,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<ProductListPage> {
    return this.productService.search(categoryId, keyword, sort, page);
  }

  @Get('main')
  main(): Promise<MainBlock[]> {
    return this.productService.getMain();
  }

  @Get(':id')
  @SerializeOptions({ groups: ['detail'] })
  get(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }
}
