import {
  Accessor,
  Column,
  ColumnInterfaceBasedOnValue,
  HeaderProps,
  IdType,
  Renderer,
  UseFiltersColumnOptions,
  UseGlobalFiltersColumnOptions,
  UseGroupByColumnOptions,
  UseResizeColumnsColumnOptions,
  UseSortByColumnOptions,
} from "react-table";

declare module "@types/react-table" {
  interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseSortByColumnOptions<D> {}

  interface ColumnGroupInterface<D extends object> {
    columns: Array<Column<D>>;
  }

  export type ColumnGroup<D extends object = {}> = ColumnInterface<D> &
    ColumnGroupInterface<D> &
    (
      | { Header: string }
      | ({ id: IdType<D> } & {
          Header: Renderer<HeaderProps<D>>;
        })
    ) & { accessor?: Accessor<D> | undefined }; // Not used, but needed for backwards compatibility

  export type ColumnWithStrictAccessor<D extends object = {}> = ColumnInterface<D> &
    ValueOf<
      {
        [K in keyof D]: {
          accessor: K;
        } & ColumnInterfaceBasedOnValue<D, D[K]>;
      }
    >;

  export type ColumnWithLooseAccessor<D extends object = {}> = ColumnInterface<D> &
    ColumnInterfaceBasedOnValue<D> &
    (
      | { Header: string }
      | { id: IdType<D> }
      | { accessor: keyof D extends never ? IdType<D> : never }
    ) & {
      accessor?: (keyof D extends never ? IdType<D> | Accessor<D> : Accessor<D>) | undefined;
    };

  export type Column<D extends object = {}> =
    | ColumnGroup<D>
    | ColumnWithLooseAccessor<D>
    | ColumnWithStrictAccessor<D>;
}
