import React from "react";
import ZigChart from ".";
import { renderWithProvidersUi } from "../../../../utils/testConfig";
import { Box } from "@mui/system";

const mockChartData = [10, 20, 25, 15, 35];

const mockEvents = [
  { x: 1, label: "Event 1" },
  { x: 2, label: "Event 2" },
];

describe("ZigChart component tests", () => {
  it("renders ZigChart component with data", () => {
    const { container } = renderWithProvidersUi(
      <Box width={"500px"}>
        <ZigChart
          id="test-chart"
          data={mockChartData}
          yAxisFormatter={(value) => value.toString()}
          tooltipFormatter={(datum) => `${datum.x}\n${datum.y}`}
          events={mockEvents}
        />
      </Box>,
    );

    expect(container.querySelector("#test-chart")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
