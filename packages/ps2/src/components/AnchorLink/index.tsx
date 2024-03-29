import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ZigLink } from '@zignaly-open/ui';

const AnchorLink = ({ children, ...props }: LinkProps) => (
  <Link {...props}>
    <ZigLink>{children as JSX.Element}</ZigLink>
  </Link>
);
export default AnchorLink;
