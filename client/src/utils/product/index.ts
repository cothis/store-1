import { QueryFunctionContext } from 'react-query';
import axios from '@utils/axios';
import { Path } from '@lib/router/history';
import { API_ENDPOINT } from '@config';
import type { IMainBlock, ProductIdAndTitle } from '@types';

type ProductsQueryKey = [
  string,
  {
    path: Path;
    categoryId?: string;
  },
];

const PRODUCT_API_ENDPOINT = '/api/v1/products';

function makeQuery(searches: { [key: string]: string }) {
  return Object.entries(searches)
    .filter(([_, value]) => value.length !== 0)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');
}

export async function fetchProductList({ queryKey }: QueryFunctionContext) {
  const [_key, { path, categoryId }] = queryKey as ProductsQueryKey;

  const searches = Object.assign({}, path.search);
  if (categoryId) searches.categoryId = categoryId;

  const query = makeQuery(searches);

  const url = PRODUCT_API_ENDPOINT + (query.length ? `?${query}` : '');
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
  const url = PRODUCT_API_ENDPOINT + `/${params}`;

  const result = await axios.get(url);
  return result.data;
}

export async function fetchMainPage(): Promise<IMainBlock[]> {
  const res = await axios.get(API_ENDPOINT + '/api/v1/products/main');
  return res.data;
}

type ProductTitleQueryKey = [
  string,
  {
    query: string;
  },
];

export async function fetchProductTitle({ queryKey }: QueryFunctionContext): Promise<ProductIdAndTitle[]> {
  const [_key, { query }] = queryKey as ProductTitleQueryKey;
  const url = PRODUCT_API_ENDPOINT + `/keywords?query=${query}`;

  const result = await axios.get(url);
  return result.data;
}
