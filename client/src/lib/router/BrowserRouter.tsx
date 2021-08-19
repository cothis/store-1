import { ReactNode } from 'react';

import { createHistory } from './history';
import Router from './Router';

interface BrowserRouterProps {
  children: ReactNode;
}

export const BrowseRouter = ({ children }: BrowserRouterProps) => {
  const history = createHistory();
  return <Router history={history}>{children}</Router>;
};
