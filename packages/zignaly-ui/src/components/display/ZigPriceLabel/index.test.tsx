import React from "react";
import ZigPriceLabel, { ZigTablePriceLabel } from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/ZigPriceLabel", () => {
  describe("renders", () => {
    it("ZigPriceLabel render", async () => {
      const { container } = renderWithProvidersUi(
        <ZigPriceLabel id={"test-id"} value={500} coin={"usdt"} />,
      );

      const priceLabel = container.querySelector("#test-id") as Element;
      expect(priceLabel).toBeVisible();
      const priceLabelStyles = getComputedStyle(priceLabel);
      expect(priceLabel).toMatchSnapshot();
      expect(priceLabelStyles).toMatchSnapshot();
    });
    it("ZigTablePriceLabel render", async () => {
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
