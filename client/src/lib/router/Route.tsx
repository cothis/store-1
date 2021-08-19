import { useContext } from 'react';
import { RouterContext } from '@context';

import type { MatchPath } from './match-path';

export interface Props {
  exact?: boolean;
  path: string;
  children: JSX.Element | JSX.Element[];
  match?: MatchPath;
}

export default function Route({ children, match }: Props): JSX.Element {
  const router = useContext(RouterContext);

  const routerValue = {
    ...router,
    match: match || {},
  };

  return <RouterContext.Provider value={routerValue}>{children}</RouterContext.Provider>;
}
