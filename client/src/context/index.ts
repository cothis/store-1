import { createContext } from 'react';

export const RouterContext = createContext<{ path: Path }>({ path: { pathname: '/', search: {}, hash: '' } });
export const HistoryContext = createContext<{ history: IHistory }>({} as { history: IHistory });
