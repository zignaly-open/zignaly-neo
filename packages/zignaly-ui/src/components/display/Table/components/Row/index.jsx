// Dependencies
import React from 'react';

// Assets
import ExpandedArrowIcon from '@assets/icons/arrow-expansion-icon.svg';

// Styled Components
import * as styled from './styles';

function Row({
  row = null,
  ...props
}) {
  return (
    <>
      <tr {...props}>
        {row.cells.map((cell, index) => (
          <td
            key={`--table-row-cell-${index.toString()}`}
            {...cell.getCellProps()}>
            {cell.render('Cell')}
          </td>
        ))}

        {row.expandable && (
          <styled.Expandable>
            <styled.ExpandableIcon src={ExpandedArrowIcon} />
          </styled.Expandable>
        )}
      </tr>
    </>
  );
}

export default Row;
