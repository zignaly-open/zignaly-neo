import React from "react";
import ZigPriceLabel, { ZigTablePriceLabel } from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/ZigPriceLabel", () => {
  it("should render ZigPriceLabel without crashing", async () => {
    const { container } = renderWithProvidersUi(
      <ZigPriceLabel id={"test-id"} value={500} coin={"usdt"} />,
    );

    const priceLabel = container.querySelector("#test-id") as Element;
    expect(priceLabel).toBeVisible();
    const priceLabelStyles = getComputedStyle(priceLabel);
    expect(priceLabel).toMatchSnapshot();
    expect(priceLabelStyles).toMatchSnapshot();
  });

  it("should render ZigTablePriceLabel without crashing", async () => {
    const { container } = renderWithProvidersUi(
      <ZigTablePriceLabel id={"test-id"} value={500} coin={"btc"} />,
    );

    const priceLabel = container.querySelector("#test-id") as Element;
    expect(priceLabel).toBeVisible();
    const priceLabelStyles = getComputedStyle(priceLabel);
    expect(priceLabel).toMatchSnapshot();
    expect(priceLabelStyles).toMatchSnapshot();
  });
});
