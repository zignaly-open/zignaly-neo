// Dependencies
import React from "react";

// Assets
import ExpandedArrowIcon from "@assets/icons/arrow-expansion-icon.svg";

// Styled Components
import * as styled from "./styles";
import { Row as _Row } from "react-table";

// @ts-ignore
const Row = ({ row, ...props }: { row: _Row<Object> }) => {
  return (
    <>
      <tr {...props}>
        {row.cells.map((cell, index) => (
          <td
            className={cell.column.id === "action" ? "action" : "row-td"}
            {...cell.getCellProps()}
            key={`--table-row-cell-${index.toString()}`}
          >
            {cell.render("Cell")}
          </td>
        ))}

        {/* @ts-ignore todo: fix */}
        {row.expandable && (
          <styled.Expandable>
            <styled.ExpandableIcon src={ExpandedArrowIcon} />
          </styled.Expandable>
        )}
      </tr>
    </>
  );
};

export default Row;
