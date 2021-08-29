import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
  SelectQueryBuilder,
  TransactionManager,
} from 'typeorm';
import { ProductBanner } from './entities/product-banner.entity';
import { Product } from './entities/product.entity';
import { ProductTag } from './enums/product-tag.enum';

import { SortType } from './enums/sort-type.enum';

export const ONE_PAGE_COUNT = 12;

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private withSort(query: SelectQueryBuilder<Product>, sort: SortType): SelectQueryBuilder<Product> {
    switch (sort) {
      case 'high-price':
        query = query.orderBy('product.price', 'DESC');
        break;
      case 'low-price':
        query = query.orderBy('product.price', 'ASC');
        break;
      case 'latest':
        break;
      case 'popular':
        query = query.orderBy('product.viewCount', 'DESC');
        break;
    }

    return query.addOrderBy('product.id', 'DESC');
  }

  async findAllAndCount(sort: SortType, page: number): Promise<[Product[], number]> {
    let query = this.createQueryBuilder('product');
    query = this.withSort(query, sort);

    const products = await query
      .offset(ONE_PAGE_COUNT * (page - 1))
      .limit(ONE_PAGE_COUNT)
      .getMany();
    const count = await this.createQueryBuilder('product').getCount();

    return [products, count];
  }

  async findByCategoryIdAndCount(categoryId: string, sort: SortType, page: number): Promise<[Product[], number]> {
    let query = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('category.id = :categoryId', { categoryId });

    query = this.withSort(query, sort);

    const products = await query
      .offset(ONE_PAGE_COUNT * (page - 1))
      .limit(ONE_PAGE_COUNT)
      .getMany();
    const count = await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getCount();

    return [products, count];
  }

  async findByKeywordAndCount(ids: string[], sort: SortType, page: number): Promise<[Product[], number]> {
    const count = ids.length;

    let query = this.createQueryBuilder('product').whereInIds(ids);
    query = this.withSort(query, sort);
    const products = await query
      .offset(ONE_PAGE_COUNT * (page - 1))
      .limit(ONE_PAGE_COUNT)
      .getMany();

    return [products, count];
  }

  findWithRecommends(id: string, @TransactionManager() manager?: EntityManager): Promise<Product> {
    if (!manager) manager = getManager();

    return manager
      .createQueryBuilder(Product, 'product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.recommends', 'recommend')
      .getOne();
  }

  async viewCountUp(product: Product): Promise<void> {
    product.viewCount += 1;
    await this.save(product);
  }

  findAllBanner(): Promise<ProductBanner[]> {
    return this.manager.getRepository(ProductBanner).find();
  }

  findByTag(tag: ProductTag, count: number): Promise<Product[]> {
    return this.createQueryBuilder('product')
      .where('FIND_IN_SET(:tag, product.tags) > 0', { tag })
      .orderBy('product.id', 'DESC')
      .limit(count)
      .getMany();
  }

  async findByProductIds(ids: string[], @TransactionManager() manager: EntityManager) {
    let products = [];
    if (!manager) {
      products = await this.findByIds(ids);
    } else {
      products = await manager.findByIds(Product, ids);
    }

    if (products.length !== ids.length) {
      throw new Error('존재하지 않는 id가 포함되어 있습니다.');
    }

    return products;
  }
}
