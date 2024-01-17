import React from "react";
import ZigTableRtkFiniteQuery from "./ZigTableRtkFiniteQuery";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { createColumnHelper } from "../../../index";

const columnHelper = createColumnHelper<{
  id: number;
  name: string;
  symbol: string;
  price: number;
}>();
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("symbol", {
    header: "Symbol",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: ({ getValue }) => getValue(),
  }),
];

describe("components/display/ZigTable/ZigTableRtkFiniteQuery", () => {
  it("should render table without crashing", () => {
    const useQuery = jest.fn();
    const { container } = renderWithProvidersUi(
      <ZigTableRtkFiniteQuery useQuery={useQuery} columns={columns} prefixId={"test"} />,
    );
    const tableElement = container.querySelector("#test__table");
    expect(tableElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
