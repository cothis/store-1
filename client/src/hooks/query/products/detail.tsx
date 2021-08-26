import { useQuery } from 'react-query';
import { fetchProductDetail } from '@utils/product/detail';
import { IProductListItem } from '@types';
interface ProductDetail extends IProductListItem {
  content: string[];
  spec: [string, string][];
  recommendations: string[];
}

export function useProductDetail(params: string) {
  return useQuery<ProductDetail, Error>(['productDetail', { params }], fetchProductDetail);
}
