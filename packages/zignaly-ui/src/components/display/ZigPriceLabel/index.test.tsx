import React from "react";
import ZigPriceLabel, { ZigTablePriceLabel } from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/ZigPriceLabel", () => {
  describe("ZigPriceLabel", () => {
    it("should render without crashing", async () => {
      const { container } = renderWithProvidersUi(
        <ZigPriceLabel id={"test-id"} value={500} coin={"usdt"} />,
      );

      const priceLabel = container.querySelector("#test-id") as Element;
      expect(priceLabel).toBeVisible();
      const priceLabelStyles = getComputedStyle(priceLabel);
      expect(priceLabel).toMatchSnapshot();
      expect(priceLabelStyles).toMatchSnapshot();
    });
  });

  describe("ZigTablePriceLabel", () => {
    it("should render without crashing", async () => {
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
});
