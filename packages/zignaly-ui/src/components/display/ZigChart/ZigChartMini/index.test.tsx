import React from "react";
import ZigChartMini from ".";
import { renderWithProvidersUi } from "../../../../utils/testConfig";
import { Box } from "@mui/system";

const mockChartData = [10, 20, 25, 15, 35];

describe("ZigChartMini component tests", () => {
  it("renders ZigChartMini component with data", () => {
    const { container } = renderWithProvidersUi(
      <Box width={"500px"}>
        <ZigChartMini id="test" data={mockChartData} midLine height={300} width={400} />
      </Box>,
    );

    expect(container.querySelector("#test")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
