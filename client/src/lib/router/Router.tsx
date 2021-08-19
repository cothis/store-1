import { useState, useEffect, ReactNode } from 'react';
import { RouterContext, HistoryContext } from '@context';

import type { IHistory, Path } from './history';

interface Props {
  children: ReactNode;
  history: IHistory;
}

export default function Router({ children, history }: Props) {
  const [path, setPath] = useState<Path>(history.path);

  useEffect(() => {
    const unlisten = history.listen((newPath) => {
      setPath(newPath);
    });
    return () => unlisten();
  });

  return (
    <RouterContext.Provider value={{ path, match: {} }}>
      <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>
    </RouterContext.Provider>
  );
}
