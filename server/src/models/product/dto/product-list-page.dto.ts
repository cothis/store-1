import { Category } from '@models/category/entities/category.entity';
import { Product } from '@models/product/entities/product.entity';
import { Exclude, Expose } from 'class-transformer';
import { SortType } from '../enums/sort-type.enum';

export class ProductListPage {
  @Exclude()
  category?: Category;

  @Expose()
  get categoryId(): string | null {
    return this.category?.id;
  }

  @Expose()
  get categoryName(): string | null {
    return this.category?.title;
  }

  sort?: SortType;

  keyword?: string;

  totalPage: number;

  currentPage: number;

  totalCount: number;

  products: Product[];
}
