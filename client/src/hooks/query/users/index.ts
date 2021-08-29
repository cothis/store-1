import { Term, User } from '@types';
import { fetchLogout, fetchTerm, fetchUser } from '@utils/users';
import { useMutation, useQuery } from 'react-query';

export const USER_QUERY_KEY = 'user';

export function useUser() {
  return useQuery<User, Error>(USER_QUERY_KEY, () => fetchUser(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useTerms(term: Term) {
  return useQuery<string, Error>(term, () => fetchTerm(term));
}

export function useLogout() {
  return useMutation((_?: unknown) => fetchLogout());
}
