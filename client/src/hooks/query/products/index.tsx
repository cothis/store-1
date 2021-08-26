import { useQuery } from 'react-query';
import { fetchProductList } from '@utils/product';
import { Path } from '@lib/router/history';
import { IProductListItem } from '@types';
type sortKeyword = 'popular' | 'latest' | 'low-price' | 'high-price ';
interface ProductListPage {
  categoryId?: string;
  sort?: sortKeyword;
  keyword?: string;
  totalPage: number;
  currentPage: number;
  totalCount: number;
  products: IProductListItem[];
}

export function useProductList(path: Path, categoryId: string) {
  return useQuery<ProductListPage, Error>(['products', { path, categoryId }], fetchProductList);
}
