import { useState, useContext, useEffect, ReactNode, ReactElement } from 'react';
import { createHistory } from './history';
import { RouterContext, HistoryContext } from '@context';
import Route, { RouteProps } from './Route';

interface RouterProps {
  children: ReactElement[] | ReactElement;
  history: IHistory;
}

interface SwitchProps {
  children: ReactElement[] | ReactElement;
}

type BrowserRouterProps = SwitchProps;

function toArray<T>(data: T | T[]): T[] {
  return Array.isArray(data) ? data : [data];
}

export const Switch = ({ children }: SwitchProps) => {
  const { path } = useContext(RouterContext);

  const childArray = toArray(children);
  // c.type을 declare하지 못해서 any로 선언
  const routes = childArray.filter((c) => (c.type as any).displayName === Route.displayName);

  let targetElem = routes.find((route) => {
    const { exact, path: targetPath } = route.props as RouteProps;
    if (exact) {
      return targetPath === path.pathname;
    }

    return path.pathname.startsWith(targetPath);
  });
  if (!targetElem) targetElem = childArray[childArray.length - 1];

  return <>{targetElem}</>;
};

const Router = ({ children, history }: RouterProps) => {
  const [path, setPath] = useState<Path>(history.path);

  useEffect(() => {
    const popStateHandle = () => setPath(window.history.state);
    window.addEventListener('popstate', popStateHandle);
  }, []);

  useEffect(() => {
    const unlisten = history.listen((newPath) => {
      setPath(newPath);
    });
    return () => unlisten();
  });

  return (
    <RouterContext.Provider value={{ path }}>
      <HistoryContext.Provider value={{ history }}>{children}</HistoryContext.Provider>
    </RouterContext.Provider>
  );
};

export const BrowseRouter = ({ children }: BrowserRouterProps) => {
  const history = createHistory();
  return <Router history={history}>{children}</Router>;
};
