import React from "react";
import BrandImage from ".";
import { renderWithProvidersUi } from "../../../../../utils/testConfig";

describe("components/navigation/Header/components/BrandImage", () => {
  it("renders with isotype prop without crashing", async () => {
    const { container } = renderWithProvidersUi(<BrandImage type={"isotype"} />);

    const imageStyles = getComputedStyle(container);
    expect(container).toMatchSnapshot();
    expect(imageStyles).toMatchSnapshot();
  });

  it("renders with logotype prop without crashing", async () => {
    const { container } = renderWithProvidersUi(<BrandImage type={"logotype"} />);

    const imageStyles = getComputedStyle(container);
    expect(container).toMatchSnapshot();
    expect(imageStyles).toMatchSnapshot();
  });
});
