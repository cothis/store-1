import { QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { Path } from '@lib/router/history';

type ProductsQueryKey = [
  string,
  {
    path: Path;
    categoryId: string;
  },
];

export async function fetchProductList({ queryKey }: QueryFunctionContext) {
  const [_key, { path, categoryId }] = queryKey as ProductsQueryKey;

  const searches = Object.assign({}, path.search);

  if (categoryId) searches.categoryId = categoryId;

  const url = Object.entries(searches).reduce((acc, [key, value], idx) => {
    if (idx === 0) return acc + '?' + `${key}=${value}`;
    return acc + `&${key}=${value}`;
  }, '/api/v1/products');

  const result = await axios.get(url);
  return result.data;
}

type ProductDetailQueryKey = [
  string,
  {
    params: string;
  },
];

export async function fetchProductDetail({ queryKey }: QueryFunctionContext) {
  const [_key, { params }] = queryKey as ProductDetailQueryKey;
  const url = `http://localhost:8080/api/v1/products/${params}`;

  const result = await axios.get(url);
  return result.data;
}
