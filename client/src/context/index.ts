import { createContext } from 'react';
import type { Path, IHistory } from '@lib/router/history';
import type { MatchPath } from '@lib/router/match-path';

export const RouterContext = createContext<{ path: Path; match: MatchPath }>({
  path: {} as Path,
  match: {},
});
export const HistoryContext = createContext<IHistory>({} as IHistory);
