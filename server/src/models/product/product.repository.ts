import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
  SelectQueryBuilder,
  TransactionManager,
} from 'typeorm';
import { Like } from '../users/entities/like.entity';
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

  findWithRecommends(id: string, userId?: string, @TransactionManager() manager?: EntityManager): Promise<Product> {
    if (!manager) manager = getManager();

    let query = manager
      .createQueryBuilder(Product, 'product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.recommends', 'recommend');

    if (userId) {
      query = query.leftJoinAndSelect('product.likes', 'like', 'like.user_id = :userId', { userId });
    }

    return query.getOne();
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

  async setLike(productId: string, userId: string, like: boolean): Promise<void> {
    const likeRepository = this.manager.getRepository(Like);
    // WHERE (EXISTS)를 통한 검색 성능 향상
    const existsQuery = likeRepository
      .createQueryBuilder('like')
      .select('like.id')
      .where('like.product_id = :productId')
      .andWhere('like.user_id = :userId')
      .getQuery();
    const existLike = await likeRepository
      .createQueryBuilder('gogo')
      .where(`EXISTS (${existsQuery})`, { productId, userId })
      .getOne();
    if (like) {
      if (!existLike) {
        await likeRepository.insert({ user: { id: userId }, product: { id: productId } });
      }
    } else {
      if (existLike) {
        await likeRepository.remove(existLike);
      }
    }
  }

  async findAllUserLikesAndCount(userId: string, page: number, onePageCount: number): Promise<[Product[], number]> {
    const products = await this.createQueryBuilder('product')
      .leftJoin('product.likes', 'like')
      .where('like.user_id = :userId', { userId })
      .orderBy('like.id', 'DESC')
      .offset(onePageCount * (page - 1))
      .limit(onePageCount)
      .getMany();

    const count = await this.createQueryBuilder('product')
      .leftJoin('product.likes', 'like')
      .where('like.user_id = :userId', { userId })
      .getCount();

    return [products, count];
  }
}
