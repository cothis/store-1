import { useQuery } from 'react-query';
import { fetchProductList } from '@lib/api/product';
import { ProductListItem } from '@components/ProductListItem';
import { Path } from '@lib/router/history';
type sortKeyword = 'popular' | 'latest' | 'low-price' | 'high-price ';
interface ProductListPage {
  categoryId?: string;
  sort?: sortKeyword;
  keyword?: string;
  totalPage: number;
  currentPage: number;
  totalCount: number;
  products: ProductListItem[];
}

export function useProductList(path: Path, categoryId: string) {
  return useQuery<ProductListPage, Error>(['products', { path, categoryId }], fetchProductList);
}
