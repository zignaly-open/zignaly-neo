// Dependencies
import React from 'react';

// Styled Components
import * as styled from './styles';

// Types
import { sizeTypesId } from '@types/sizes';

function TableButton({
  caption,
  variant = null,
  size = sizeTypesId.SMALL,
  icon = null,
  onClick = () => {}
}) {
  return (
    <styled.Layout
      onClick={onClick}
      variant={variant}
      size={size}>
      {icon && (
        <styled.Icon src={icon} />
      )}
      <styled.Caption>
        {caption}
      </styled.Caption>
    </styled.Layout>
  );
}

export default TableButton;
