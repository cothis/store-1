import useHistory from '@hooks/useHistory';
import { MouseEvent, ReactNode } from 'react';
import { createHref } from './history';

interface LinkProps {
  to: To;
  replace?: boolean;
  children: ReactNode;
}

export default function Link({ to, replace, children }: LinkProps) {
  const history = useHistory();
  const href = createHref(to);

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  };

  return (
    <a href={href} onClick={clickHandler}>
      {children}
    </a>
  );
}
