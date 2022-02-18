// Dependencies
import React from 'react';

// Styled Components
import * as styled from './index.styles';

function TableButton({ caption, icon = null }) {
  return (
    <styled.Layout>
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
