import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import ZigTableData from "./ZigTableData";
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

describe("components/display/ZigTable/ZigTableData", () => {
  it("should render table without crashing", () => {
    const { container } = renderWithProvidersUi(
      <ZigTableData data={testData} columns={columns} prefixId={"test"} />,
    );
    const tableElement = container.querySelector("#test__table");
    expect(tableElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should sort table when header is clicked", async () => {
    const onSortingChange = jest.fn();
    renderWithProvidersUi(
      <ZigTableData
        data={testData}
        columns={columns}
        prefixId={"test"}
        onSortingChange={onSortingChange}
        sorting={[{ id: "name", desc: true }]}
      />,
    );
    const headerCell = screen.getByText("Price");
    fireEvent.click(headerCell);
    await waitFor(() => {
      expect(onSortingChange).toHaveBeenCalled();
    });
  });

  it("should not render if data prop is empty", () => {
    renderWithProvidersUi(
      <ZigTableData data={[]} columns={columns} emptyMessage={"No data available"} />,
    );
    const emptyMessageElement = screen.getByText(/No data available/i);
    expect(emptyMessageElement).toBeInTheDocument();
  });

  it("should render subcomponent when a row is expanded", async () => {
    const renderSubComponent = jest.fn();
    renderWithProvidersUi(
      <ZigTableData
        data={testData}
        columns={columns}
        prefixId={"test"}
        renderSubComponent={renderSubComponent}
      />,
    );
    const expandButton = screen.getByText("Ethereum");
    fireEvent.click(expandButton);
    await waitFor(() => {
      expect(renderSubComponent).toHaveBeenCalled();
    });
  });

  it("should trigger page change when pagination controls are clicked", async () => {
    const { container } = renderWithProvidersUi(
      <ZigTableData data={testData} columns={columns} prefixId={"test"} pageCount={2} />,
    );
    expect(container.querySelector("#test-table__current-page")?.textContent).toContain("1");

    const nextPageButton = container.querySelector("#test-table__go-next-page") as Element;
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(container.querySelector("#test-table__current-page")?.textContent).toContain("2");
    });
  });
});
