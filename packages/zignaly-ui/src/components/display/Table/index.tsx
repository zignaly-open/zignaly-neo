import React, { useCallback } from "react";
import { TableProps, tableTypes } from "./types";
import BasicTable from "./types/BasicTable";
import PagedWithDataTable from "./types/PagedWithDataTable";

const Table = ({
  columns = [],
  data = [],
  defaultHiddenColumns = [],
  hideOptionsButton,
  initialState = {},
  isUserTable,
  onColumnHidden = () => null,
  type = "basic",
  emptyMessage, // TODO: default
}: TableProps) => {
  const renderTable = useCallback(() => {
    switch (type) {
      case tableTypes.pagedWithData:
        return (
          <PagedWithDataTable
            columns={columns}
            data={data}
            onColumnHidden={onColumnHidden}
            defaultHiddenColumns={defaultHiddenColumns}
            hideOptionsButton={hideOptionsButton}
            isUserTable={isUserTable}
            initialState={initialState}
            emptyMessage={emptyMessage}
          />
        );
      case tableTypes.basic:
      default:
        return (
          <BasicTable
            columns={columns}
            data={data}
            onColumnHidden={onColumnHidden}
            defaultHiddenColumns={defaultHiddenColumns}
            hideOptionsButton={hideOptionsButton}
            isUserTable={isUserTable}
            initialState={initialState}
            emptyMessage={emptyMessage}
          />
        );
    }
  }, [type, columns, data, onColumnHidden, defaultHiddenColumns, hideOptionsButton, isUserTable]);

  return renderTable();
};

export default Table;
