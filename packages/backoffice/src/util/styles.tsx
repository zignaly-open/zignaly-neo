import React from 'react';

export const withAttrs =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Component: React.ElementType, attrs: any) => (props: any) =>
    <Component {...attrs} {...props} />;
