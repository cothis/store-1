import useHistory from '@hooks/useHistory';
import usePath from '@hooks/usePath';
import { MouseEvent, CSSProperties, ReactNode } from 'react';

import type { Search, To } from './history';
import { createHref } from './history';

interface NavLinkProps {
  exact?: boolean;
  to: To;
  replace?: boolean;
  children: ReactNode;
  activeClassName?: string;
  activeStyle?: CSSProperties;
  goTop?: boolean;
}

function checkSearchAndHash(to: Exclude<To, string>, search: Search, hash: string): boolean {
  let match = true;
  if (match && to.search) {
    for (const [key, value] of Object.entries(to.search)) {
      // key가 현재 search에 있는데 value가 일치하지 않거나
      // key가 현재 search에 없는데 value가 존재한다면
      if ((key in search && search[key] !== value) || (!(key in search) && value.trim())) {
        match = false;
        break;
      }
    }
  }
  if (match && to.hash && to.hash !== hash) {
    match = false;
  }

  return match;
}

export default function NavLink(props: NavLinkProps) {
  const { exact, to, replace, children, activeClassName = 'active', activeStyle = {} } = props;

  const history = useHistory();
  const { pathname, search, hash } = usePath();
  if (typeof to !== 'string' && !to.pathname) {
    to.pathname = pathname;
  }
  const href = createHref(to);

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
    if (props.goTop) {
      window.scrollTo(0, 0);
    }
  };

  let isActive = false;

  if (exact) {
    if (typeof to === 'string') {
      isActive = pathname === to;
    } else {
      isActive = !(to.pathname && to.pathname !== pathname) && checkSearchAndHash(to, search, hash);
    }
  } else {
    if (typeof to === 'string') {
      isActive = pathname.startsWith(to);
    } else {
      isActive = !(to.pathname && !pathname.startsWith(to.pathname)) && checkSearchAndHash(to, search, hash);
    }
  }

  return (
    <a
      href={href}
      onClick={clickHandler}
      className={(isActive && activeClassName) || undefined}
      style={(isActive && activeStyle) || undefined}
    >
      {children}
    </a>
  );
}
