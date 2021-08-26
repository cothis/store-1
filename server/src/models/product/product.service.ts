import path from 'path';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductListPage } from './dto/product-list-page.dto';
import { ProductRepository } from './product.repository';

import { SortType } from './enums/sort-type.enum';
import { ONE_PAGE_COUNT } from './product.repository';
import { CategoryRepository } from '@models/category/category.repository';
import { Product } from './entities/product.entity';
import { AppConfigService } from 'src/config/app.service';

@Injectable()
export class ProductService {
  private s3: string;

  constructor(
    @InjectRepository(ProductRepository) private readonly productRepository: ProductRepository,
    @InjectRepository(CategoryRepository) private readonly categoryRepository: CategoryRepository,
    readonly appConfigService: AppConfigService,
  ) {
    this.s3 = appConfigService.s3;
  }

  async search(
    categoryId: string | null,
    keyword: string | null,
    sort: SortType = SortType.LATEST,
    page: number = 1,
  ): Promise<ProductListPage> {
    if (page < 1) {
      page = 1;
    }

    const result = new ProductListPage();

    if (!categoryId && !keyword) {
      [result.products, result.totalCount] = await this.productRepository.findAllAndCount(sort, page);
    }

    if (categoryId) {
      const category = await this.categoryRepository.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('해당 category가 존재하지 않습니다.');
      }
      result.category = category;
      [result.products, result.totalCount] = await this.productRepository.findByCategoryIdAndCount(
        categoryId,
        sort,
        page,
      );
    }

    if (keyword) {
      // TODO: elastic search와 연결
      if (keyword.length < 2) {
        throw new BadRequestException('keyword는 두글자 이상이여야 합니다.');
      }
      result.keyword = keyword;
      [result.products, result.totalCount] = await this.productRepository.findByKeywordAndCount(keyword, sort, page);
    }

    result.totalPage = Math.ceil(result.totalCount / ONE_PAGE_COUNT);
    result.currentPage = page > result.totalPage ? result.totalPage : page;

    result.products.forEach((product) => {
      product.image = path.join(this.s3, product.image);
    });

    return result;
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findWithRecommends(id);
    if (!product) {
      throw new NotFoundException('해당 상품이 존재하지 않습니다.');
    }

    product.image = path.join(this.s3, product.image);
    product.content = product.content.map((i) => path.join(this.s3, i));

    product.recommends?.forEach((recommend) => {
      recommend.image = path.join(this.s3, recommend.image);
      // serializer group이 recursive하게 먹혀서 강제 제거
      recommend.content = undefined;
      recommend.detailInfo = undefined;
    });

    return product;
  }
}
