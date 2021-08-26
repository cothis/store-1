import { fetchCategories } from '@utils/categories';
import { ICategory } from '@types';
import { useQuery } from 'react-query';

export function useCategories() {
  const queryOptions = {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  };
  return useQuery<ICategory[], Error>(['categories'], fetchCategories, queryOptions);
}
