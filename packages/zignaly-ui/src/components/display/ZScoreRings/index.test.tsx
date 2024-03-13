import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import ZScoreRings from ".";

describe("components/display/ZScoreRing", () => {
  it("should render", async () => {
    const { getByText } = renderWithProvidersUi(
      <ZScoreRings
        zScore={86}
        profits={45}
        risk={24}
        service={17}
        profitsMax={45}
        riskMax={25}
        serviceMax={20}
      />,
    );
    expect(getByText("86")).toBeInTheDocument();
    expect(getByText("/100")).toBeInTheDocument();
  });
});
