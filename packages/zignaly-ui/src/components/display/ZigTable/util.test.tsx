import { renderWithProvidersUi } from "../../../utils/testConfig";
import React from "react";
import { downloadTableCsv, ZigButton } from "../../../index";
import { fireEvent, waitFor } from "@testing-library/react";
// @ts-ignore
import * as downloadCsvModule from "download-csv";

jest.mock("download-csv");

describe("components/display/ZigTable/util/downloadTableCsv", () => {
  it("should generate and download CSV file", async () => {
    const data = [
      [1, "Ethereum", "ETH", 800000],
      [2, "Bitcoin", "BTC", 5000],
    ];
    const columnNames = ["id", "name", "symbol", "price"];

    const { getByText } = renderWithProvidersUi(
      <ZigButton onClick={() => downloadTableCsv(data, columnNames, "asdasd.csv")}>
        export
      </ZigButton>,
    );

    fireEvent.click(getByText("export"));

    await waitFor(() => {
      expect(downloadCsvModule.creatCsvFile).toHaveBeenCalledWith(
        [
          { "0": 1, "1": "Ethereum", "2": "ETH", "3": 800000 },
          { "0": 2, "1": "Bitcoin", "2": "BTC", "3": 5000 },
        ],
        { "0": "id", "1": "name", "2": "symbol", "3": "price" },
      );
      expect(downloadCsvModule.downloadFile).toHaveBeenCalled();
    });
  });
});
