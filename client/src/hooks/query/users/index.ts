import { ProductListPage, Term, User } from '@types';
import { fetchLogout, fetchTerm, fetchUser, fetchUserLikes } from '@utils/users';
import { useMutation, useQuery } from 'react-query';

export const USER_QUERY_KEY = 'user';
export const USER_LIKE_QUERY_KEY = 'user/me/like';

export function useUser() {
  return useQuery<User, Error>(USER_QUERY_KEY, () => fetchUser(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useUserLikes(page: number) {
  return useQuery<ProductListPage, Error>([USER_LIKE_QUERY_KEY, { page }], () => fetchUserLikes(page));
}

export function useTerms(term: Term) {
  return useQuery<string, Error>(term, () => fetchTerm(term));
}

export function useLogout() {
  return useMutation((_?: unknown) => fetchLogout());
}
