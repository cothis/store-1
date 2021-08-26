import { useQuery } from 'react-query';
import { IProductListItem } from '@types';
import { fetchProductList, fetchProductDetail } from '@utils/product';
import { Path } from '@lib/router/history';
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

interface ProductDetail extends IProductListItem {
  content: string[];
  detailInfo: [string, string][];
  recommends: IProductListItem[];
}

export function useProductList(path: Path, categoryId: string) {
  return useQuery<ProductListPage, Error>(['products', { path, categoryId }], fetchProductList);
}

export function useProductDetail(params: string) {
  return useQuery<ProductDetail, Error>(['productDetail', { params }], fetchProductDetail);
}
