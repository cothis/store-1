import { useQuery } from 'react-query';
import { IMainBlock, ProductDetail, ProductIdAndTitle, ProductListPage } from '@types';
import { fetchProductList, fetchProductDetail, fetchMainPage, fetchProductTitle } from '@utils/product';
import { Path } from '@lib/router/history';

export const PRODUCT_DETAIL_QUERY_KEY = 'productDetail';

export function useProductList(path: Path, categoryId?: string) {
  return useQuery<ProductListPage, Error>(['products', { path, categoryId }], fetchProductList);
}

export function useProductDetail(params: string) {
  return useQuery<ProductDetail, Error>([PRODUCT_DETAIL_QUERY_KEY, { params }], fetchProductDetail);
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
