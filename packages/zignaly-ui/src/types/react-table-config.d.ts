import {
  UseExpandedOptions,
  UseExpandedRowProps,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersOptions,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersOptions,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UsePaginationOptions,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByOptions,
} from "react-table";

declare module "react-table" {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<D extends object>
    extends UseTableOptions<D>,
      UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  //   export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
  //     extends UseExpandedHooks<D>,
  //       UseGroupByHooks<D>,
  //       UseRowSelectHooks<D>,
  //       UseSortByHooks<D> {}

  //   export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
  //     extends UseColumnOrderInstanceProps<D>,
  //       UseExpandedInstanceProps<D>,
  //       UseFiltersInstanceProps<D>,
  //       UseGlobalFiltersInstanceProps<D>,
  //       UseGroupByInstanceProps<D>,
  //       UsePaginationInstanceProps<D>,
  //       UseRowSelectInstanceProps<D>,
  //       UseRowStateInstanceProps<D>,
  //       UseSortByInstanceProps<D> {}

  //   export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
  //     extends UseColumnOrderState<D>,
  //       UseExpandedState<D>,
  //       UseFiltersState<D>,
  //       UseGlobalFiltersState<D>,
  //       UseGroupByState<D>,
  //       UsePaginationState<D>,
  //       UseResizeColumnsState<D>,
  //       UseRowSelectState<D>,
  //       UseRowStateState<D>,
  //       UseSortByState<D> {}

  export interface ColumnInterface<D extends object = {}>
    extends UseTableColumnOptions<D>,
      UseFiltersColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseSortByColumnOptions<D> {}

  export interface ColumnInstance<D extends object = {}>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}

  // export interface Cell<D extends Record<string, unknown> = Record<string, unknown>, V = any>
  //   extends UseGroupByCellProps<D>,
  //     UseRowStateCellProps<D> {}

  export interface Row<D extends object = {}>
    extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {}
}
