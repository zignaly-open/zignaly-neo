// Dependencies
import React from 'react';

// Styles
import * as styled from './index.styles';

const componentByVariants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'span',
  number: 'span'
};

function Typography({
  children,
  variant = 'body',
  size = 'medium',
  style = null,
  weight = null,
  component = null,
  className = ''
}) {
  return (
    <styled.Layout
      weight={weight}
      className={[variant, size, style && `style-${style}`, className]}
      as={component ?? componentByVariants[variant]}
    >
      {children}
    </styled.Layout>
  );
}

export default Typography;
