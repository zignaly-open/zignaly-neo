import React from "react";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { screen } from "@testing-library/react";
import ZigCoinIcon from ".";
import { COIN_SIZES, sizes } from "./types";

describe("components/display/ZigCoinIcon", () => {
  const mockCoin = "btc";

  it("should render without crashing", () => {
    const { container } = renderWithProvidersUi(<ZigCoinIcon coin={mockCoin} />);
    const coinIcon = screen.getByAltText(mockCoin);
    expect(coinIcon).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it("should set the correct source URL when coin prop changes", () => {
    const s = sizes[COIN_SIZES.Medium];
    const { rerender } = renderWithProvidersUi(<ZigCoinIcon coin={mockCoin} />);
    const coinIcon = screen.getByAltText(mockCoin);
    const expectedSrc = `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${s},h_${s},r_max/coins-binance/${mockCoin}`;
    expect(coinIcon).toHaveAttribute("src", expectedSrc);

    const newMockCoin = "eth";
    rerender(<ZigCoinIcon coin={newMockCoin} />);
    const newCoinIcon = screen.getByAltText(newMockCoin);
    const newExpectedSrc = `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${s},h_${s},r_max/coins-binance/${newMockCoin}`;
    expect(newCoinIcon).toHaveAttribute("src", newExpectedSrc);
  });

  it("should not render if coin prop is falsy", () => {
    renderWithProvidersUi(<ZigCoinIcon coin={""} />);
    const coinIcon = screen.queryByAltText("btc");
    expect(coinIcon).not.toBeInTheDocument();
  });

  it("should render ZignalyIcon when coin is 'zig'", () => {
    renderWithProvidersUi(<ZigCoinIcon coin="zig" />);
    const zignalyIcon = screen.queryByAltText("zig");
    expect(zignalyIcon).toBeInTheDocument();
  });
});
