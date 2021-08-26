import { QueryFunctionContext } from 'react-query';
import axios from 'axios';

type ProductDetailQueryKey = [
  string,
  {
    params: string;
  },
];

export async function fetchProductDetail({ queryKey }: QueryFunctionContext) {
  const [_key, { params }] = queryKey as ProductDetailQueryKey;
  const url = `/api/v1/products/${params}`;

  const result = await axios.get(url);
  return result.data;
}
