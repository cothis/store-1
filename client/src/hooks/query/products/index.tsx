import { useQuery } from 'react-query';
import { IMainBlock, IProductListItem, ProductIdAndTitle } from '@types';
import { fetchProductList, fetchProductDetail, fetchMainPage, fetchProductTitle } from '@utils/product';
import { Path } from '@lib/router/history';

type sortKeyword = 'popular' | 'latest' | 'low-price' | 'high-price ';

interface ProductListPage {
  categoryId?: string;
  sort?: sortKeyword;
  keyword?: string;
  totalPage: number;
  currentPage: number;
  totalCount: number;
  categoryName?: string;
  products: IProductListItem[];
}

interface ProductDetail extends IProductListItem {
  content: string[];
  detailInfo: [string, string][];
  recommends: IProductListItem[];
}

export function useProductList(path: Path, categoryId?: string) {
  return useQuery<ProductListPage, Error>(['products', { path, categoryId }], fetchProductList);
}

export function useProductDetail(params: string) {
  return useQuery<ProductDetail, Error>(['productDetail', { params }], fetchProductDetail);
}

export function useMainPage() {
  return useQuery<IMainBlock[], Error>('main-page', fetchMainPage);
}

export function useProductTitle(query: string) {
  return useQuery<ProductIdAndTitle[], Error>(['productTitle', { query }], fetchProductTitle, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
