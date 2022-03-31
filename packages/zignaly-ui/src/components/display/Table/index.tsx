// Dependencies
import React, { useRef, useState, useMemo } from "react";
import { useTable, useSortBy, Column } from "react-table";
import { useClickAway } from "react-use";

// Assets
import ArrowBottomIcon from "@assets/icons/arrow-bottom-icon.svg";
import OptionsDotsIcon from "../../../assets/icons/option-dots-icon.svg";
import CloseIcon from "../../../assets/icons/close-icon.svg";

// Styles
import {
  Layout,
  View,
  TableView,
  SortIcon,
  OptionsMenu,
  OptionHead,
  OptionTitle,
  OptionList,
  OptionItem,
} from "./styles";

// Components
import Row from "./components/Row";
import IconButton from "@components/inputs/IconButton";
import CheckBox from "@components/inputs/CheckBox";

// Types
import { buttonVariantsId } from "../../../types/buttons";

const Table = ({ columns = [], data = [] }: { columns: Column<any>[]; data: Object[] }) => {
  const menuRef = useRef(null);
  const [isTableOptionsEnabled, setTableOptionEnabled] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  /**
   * @var withOptionsMenu
   * @description Memorize the columns of the table by adding the menu option.
   */
  const withOptionsColumns = useMemo(
    () => [
      ...columns,
      {
        Header: (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              variant={buttonVariantsId.FLAT}
              icon={OptionsDotsIcon}
              onClick={() => {
                setTableOptionEnabled(true);
              }}
            />
          </div>
        ),
        accessor: "action",
        disableSortBy: true,
      },
    ],
    [columns],
  );

  const { getTableProps, getTableBodyProps, rows, headerGroups, toggleHideColumn, prepareRow } =
    useTable(
      {
        columns: withOptionsColumns,
        data,
      },
      useSortBy,
    );

  const firstPageRows = rows.slice(0, 20);

  useClickAway(menuRef, () => {
    if (isTableOptionsEnabled) {
      setTableOptionEnabled(false);
    }
  });

  return (
    <Layout>
      <View>
        <TableView {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`--table-head-${index.toString()}`}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={`--table-head-row-${index.toString()}`}
                  >
                    {column.render("Header")}
                    {column.isSorted && (
                      <SortIcon isSortedDesc={column.isSortedDesc} src={ArrowBottomIcon} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <Row row={row} {...row.getRowProps()} />
              );
            })}
          </tbody>
        </TableView>
      </View>
      <OptionsMenu ref={menuRef} disabled={!isTableOptionsEnabled}>
        <OptionHead>
          <OptionTitle>Options</OptionTitle>
          <IconButton icon={CloseIcon} onClick={() => setTableOptionEnabled(false)} />
        </OptionHead>
        <OptionList>
          {columns.map((column: any, index) => (
            <OptionItem key={`--options-container-${index.toString()}`}>
              <CheckBox
                value={hiddenColumns.find((e) => e === column.accessor) ?? true}
                label={(column.Header ?? "").toString()}
                onChange={(isActive: boolean) => {
                  toggleHideColumn(column.accessor, !isActive);
                  if (!isActive) {
                    // @ts-ignore
                    setHiddenColumns((prevState: any[]) => {
                      return [...prevState, column.accessor];
                    });
                  } else {
                    setHiddenColumns((prevState) => prevState.filter((e) => e !== column.accessor));
                  }
                }}
                disabled={
                  hiddenColumns.length >= columns.length / 2 &&
                  !hiddenColumns.find((e) => e === column.accessor)
                }
              />
            </OptionItem>
          ))}
        </OptionList>
      </OptionsMenu>
    </Layout>
  );
};

export default Table;
