// Dependencies
import React, { useCallback } from "react";

// Types
import {TableProps, tableTypes} from "./types";

// Components
import BasicTable from "./types/BasicTable";
import PagedWithDataTable from "./types/PagedWithDataTable";

const Table = ({
  type = "basic",
  columns = [],
  data = [],
  onColumnHidden = () => {},
  defaultHiddenColumns = [],
  hideOptionsButton,
  isUserTable,
  initialState = {},
}: TableProps) => {
  const renderTable = useCallback(() => {
    switch (type) {
      case tableTypes.pagedWithData:
        return (<PagedWithDataTable columns={columns} data={data} onColumnHidden={onColumnHidden} defaultHiddenColumns={defaultHiddenColumns} hideOptionsButton={hideOptionsButton} isUserTable={isUserTable} initialState={initialState} />);
      case tableTypes.basic:
      default:
        return (<BasicTable columns={columns} data={data} onColumnHidden={onColumnHidden} defaultHiddenColumns={defaultHiddenColumns} hideOptionsButton={hideOptionsButton} isUserTable={isUserTable} initialState={initialState} />);
    }
  }, [type, columns, data, onColumnHidden, defaultHiddenColumns, hideOptionsButton, isUserTable, ]);

  return renderTable();
};

export default Table;
