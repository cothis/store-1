import useHistory from '@hooks/useHistory';
import useRouter from '@hooks/useRouter';
import { MouseEvent, CSSProperties, ReactNode } from 'react';
import { createHref } from '@/router/history';

interface NavLinkProps {
  exact?: boolean;
  to: To;
  replace?: boolean;
  children: ReactNode;
  activeClassName?: string;
  activeStyle?: CSSProperties;
}

export default function NavLink(props: NavLinkProps) {
  const { exact, to, replace, children, activeClassName = 'active', activeStyle = {} } = props;

  const history = useHistory();
  const { pathname } = useRouter();
  const href = createHref(to);

  const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (replace) {
      history.replace(to);
    } else {
      history.push(to);
    }
  };

  let isActive = false;

  if (exact) {
    if (typeof to === 'string') {
      isActive = pathname === to;
    } else if (to.pathname) {
      isActive = pathname === to.pathname;
    }
  } else {
    if (typeof to === 'string') {
      isActive = pathname.startsWith(to);
    } else if (to.pathname) {
      isActive = pathname.startsWith(to.pathname);
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
