import { Term } from '@types';
import { fetchTerm } from '@utils/users';
import { useQuery } from 'react-query';

export function useTerms(term: Term) {
  return useQuery<string, Error>(term, () => fetchTerm(term));
}
