import React, {useCallback, useRef, useState} from "react";
import {usePagination, useSortBy, useTable} from "react-table";

// Styles
import {
    ColumnsSelector,
    HeaderRow, IconContainer,
    Layout,
    OptionItem,
    OptionList, SortIcon,
    TableView,
    TextContainer,
    ThView,
    View
} from "../../styles";
import {dark} from "../../../../../theme";

// Components
import Typography from "../../../Typography";
import CheckBox from "../../../../inputs/CheckBox";
import IconButton from "../../../../inputs/IconButton";

// Assets
import OptionsDotsIcon from "../../../../../assets/icons/option-dots-icon.svg";

// Types
import {TableBasicProps} from "../../types";

export default function PagedWithDataTable({
    columns = [],
    data = [],
    onColumnHidden = () => {},
    defaultHiddenColumns,
    hideOptionsButton,
    isUserTable,
    initialState = {},
    hasFooter = false
 }: TableBasicProps) {
    // Refs
    const tableRef = useRef(null);

    // States
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(defaultHiddenColumns || []);

    // Hooks
    // @ts-ignore
    const { getTableProps, getTableBodyProps, page, headerGroups, footerGroups, toggleHideColumn, prepareRow, gotoPage, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, pageCount, setPageSize, state: { pageIndex, pageSize } } = useTable({
            columns,
            data,
            initialState
        },
        useSortBy,
        usePagination
    );

    //const propsBasisUseTable = { getTableProps, getTableBodyProps, headerGroups, prepareRow, toggleHideColumn, page, gotoPage, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state: { pageIndex } };

    //const firstPageRows = rows.slice(0, 20);

    /**
     * @function renderActionRow():
     * @description Inject the action row on "column options" column.
     */
    const renderActionRow = useCallback(
        (row: any, index: number) => {
            if (data.find((e: any) => e.action)) {
                return (
                    <td className={"action"} key={`--table-row-cell-${index.toString()}`}>
                        {/*@ts-ignore*/}
                        {data[row.index].action}
                    </td>
                );
            } else if (!hideOptionsButton) {
                return (
                    <td className={"action"} key={`--table-row-cell-${index.toString()}`}>
                        {/*@ts-ignore*/}
                        {""}
                    </td>
                );
            }
        },
        [data],
    );

    const hideColumn = (column: string) => {
        setHiddenColumns((prevState: any[]) => {
            return [...prevState, column];
        });
        onColumnHidden(column, true);
    };

    const showColumn = (column: string) => {
        setHiddenColumns((prevState) => prevState.filter((e) => e !== column));
        onColumnHidden(column, false);
    };

    const renderColumnsSelector = useCallback(() => {
        return (
            <ColumnsSelector>
                <Typography>Show/Hide Columns</Typography>
                <OptionList>
                    {columns.map((column: any, index) => {
                        const isDisabled =
                            hiddenColumns.length >= columns.length - 2 &&
                            !hiddenColumns.find((e) => e === column.accessor);

                        const isActive = !hiddenColumns.find((e) => e === column.accessor);

                        return (
                            <OptionItem key={`--options-container-${index.toString()}`}>
                                <CheckBox
                                    value={isActive}
                                    label={column.Header ?? ""}
                                    onChange={(isActive: boolean) => {
                                        toggleHideColumn(column.accessor, !isActive);
                                        if (!isActive) {
                                            hideColumn(column.accessor);
                                        } else {
                                            showColumn(column.accessor);
                                        }
                                    }}
                                    disabled={isDisabled}
                                />
                            </OptionItem>
                        );
                    })}
                </OptionList>
            </ColumnsSelector>
        );
    }, [columns, hiddenColumns]);
    return (
        <Layout>
            <View ref={tableRef}>
                <TableView isUserTable={isUserTable} {...getTableProps()}>
                    <thead>
                    {headerGroups.map((headerGroup: any, index: number) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={`--table-head-${index.toString()}`}>
                            {headerGroup.headers.map((column: any, index: number) => (
                                <ThView
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    key={`--table-head-row-${index.toString()}`}
                                    isSorted={column.isSorted}
                                >
                                    <HeaderRow>
                                        <TextContainer>
                                            <Typography color={"neutral200"} variant={"body2"} weight={"regular"}>
                                                {column.render("Header")}
                                            </Typography>
                                            <Typography color={"neutral400"} variant={"h5"} weight={"regular"}>
                                                {column.headerWithFooter}
                                            </Typography>
                                        </TextContainer>
                                        <IconContainer>
                                            {index < headerGroup.headers.length && (
                                                <SortIcon
                                                    color={dark["neutral200"]}
                                                    isSorted={column.isSorted}
                                                    isSortedDesc={column.isSortedDesc}
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                        </IconContainer>
                                    </HeaderRow>
                                </ThView>
                            ))}
                            <th role={"row"}>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    {!hideOptionsButton && (
                                        <IconButton
                                            variant={"flat"}
                                            icon={<OptionsDotsIcon color={dark["neutral200"]} />}
                                            dropDownOptions={{
                                                componentOverflowRef: tableRef,
                                                alignment: "right",
                                            }}
                                            renderDropDown={renderColumnsSelector()}
                                        />
                                    )}
                                </div>
                            </th>
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row: any, index: number) => {
                        prepareRow(row);
                        return (
                            <tr key={`--firstPageRows-${index.toString()}`} {...row.getRowProps()}>
                                {row.cells.map((cell: any, index: number) => (
                                    <td
                                        className={cell.column.id === "action" ? "action" : "row-td"}
                                        {...cell.getCellProps()}
                                        key={`--table-row-cell-${index.toString()}`}
                                    >
                                        <Typography variant="body2" weight="medium" color="neutral200">
                                            {cell.render("Cell")}
                                        </Typography>
                                    </td>
                                ))}
                                {renderActionRow(row, index)}
                            </tr>
                        );
                    })}
                    </tbody>
                    <tfoot>
                        {hasFooter && footerGroups.map((group: any, index: number) => (
                            <tr {...group.getFooterGroupProps()} key={`--table-foot-${index.toString()}`}>
                                {group.headers.map((column: any, index: number) => (
                                    <td {...column.getFooterProps()} key={`--table-foot-cell-${index.toString()}`}>{column.render('Footer')}</td>
                                ))}
                                <td className={"action"} key={`--table-foot-cell-${group.headers.length.toString()}`}>
                                    {""}
                                </td>
                            </tr>
                        ))}
                        { data.length > 10 && (
                            <tr>
                                <td colSpan={Object.keys(data[0]).length}>
                                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                        {'<<'}
                                    </button>{' '}
                                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                        {'<'}
                                    </button>{' '}

                                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                                        {'>'}
                                    </button>{' '}
                                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                        {'>>'}
                                    </button>{' '}
                                    <span>
                                  Page{' '}
                                        <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                  </strong>{' '}
                                </span>
                                    <span>
                                | Go to page:{' '}
                                        <input
                                            type="number"
                                            defaultValue={pageIndex + 1}
                                            onChange={e => {
                                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                                gotoPage(page);
                                            }}
                                            style={{ width: '100px' }}
                                        />
                                </span>{' '}
                                    <select
                                        value={pageSize}
                                        onChange={e => {
                                            setPageSize(Number(e.target.value));
                                        }}
                                    >
                                        {[10, 20, 30, 40, 50].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                Show {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        )}
                    </tfoot>
                </TableView>
            </View>
        </Layout>
    );
}
