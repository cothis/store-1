import { useContext } from 'react';

import { RouterContext } from '@context';
import { MatchPath } from '@lib/router/match-path';

export default function useParams(): MatchPath {
  return useContext(RouterContext).match;
}
