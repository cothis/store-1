import React, { useContext, ReactNode } from 'react';
import { RouterContext } from '@context';

import Route, { Props as RouteProps } from './Route';
import { isPathWithParam, MatchPath, matchPath } from './match-path';

interface Props {
  children: ReactNode;
}

export default function Switch({ children }: Props): JSX.Element | null {
  const { path } = useContext(RouterContext);

  const count = React.Children.count(children);
  let element: ReactNode | null = null;
  let match: MatchPath | null = null;

  React.Children.forEach(children, (child, index) => {
    if (element === null) {
      if (React.isValidElement(child) && child.type === Route) {
        const { exact, path: targetPath } = child.props as RouteProps;

        if (exact && targetPath === path.pathname) {
          element = child;
          return;
        }

        if (isPathWithParam(targetPath)) {
          match = matchPath(path.pathname, targetPath);
          if (match) {
            element = child;
            return;
          }
        }

        if (!exact && path.pathname.startsWith(targetPath)) {
          element = child;
          return;
        }
      }

      if (index === count - 1) {
        element = child;
      }
    }
  });

  return element ? React.cloneElement(element, { match }) : null;
}
