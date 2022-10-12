import React, { ReactElement } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export function NavigationLink({
  children,
  to,
  ...props
}: LinkProps): ReactElement {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link className={match ? 'active' : undefined} to={to} {...props}>
      {children}
    </Link>
  );
}
