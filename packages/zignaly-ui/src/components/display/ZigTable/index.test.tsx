import React from "react";
import ZigTable from ".";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { createColumnHelper } from "../../../index";

const testData = [
  { id: 1, name: "Ethereum", symbol: "ETH", price: 800000 },
  { id: 2, name: "Bitcoin", symbol: "BTC", price: 5000 },
];

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

describe("components/display/ZigTable", () => {
  it("should render ZigTableData without crashing", () => {
    const { container } = renderWithProvidersUi(
      <ZigTable data={testData} columns={columns} prefixId={"test"} />,
    );
    const tableElement = container.querySelector("#test__table");
    expect(tableElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render ZigTableRtkFiniteQuery without crashing", () => {
    const useQuery = jest.fn();
    const { container } = renderWithProvidersUi(
      <ZigTable useQuery={useQuery} columns={columns} prefixId={"test"} />,
    );
    const tableElement = container.querySelector("#test__table");
    expect(tableElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render ZigTableRtkInfiniteQuery without crashing", () => {
    const useQuery = jest.fn();
    const { container } = renderWithProvidersUi(
      <ZigTable useInfiniteQuery={useQuery} columns={columns} prefixId={"test"} />,
    );
    const tableElement = container.querySelector("#test__table");
    expect(tableElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
