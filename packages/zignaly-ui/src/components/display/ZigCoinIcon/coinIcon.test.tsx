import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./stories";
import { sizes } from "./types";

const { EtherCoinIconStory } = composeStories(stories);

describe("components/display/ZigCoinIcon", () => {
  describe("stories", () => {
    it("should render", () => {
      const src = `https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${sizes.medium},h_${sizes.medium},r_max/coins-binance/ETH`;
      const renderEtherCoin = render(<EtherCoinIconStory />);
      const etherCoinIconImage = renderEtherCoin.getByRole("img");
      expect(etherCoinIconImage).toHaveAttribute("src", src);
      expect(etherCoinIconImage).toHaveAttribute("alt", "Ethereum");
      expect(etherCoinIconImage).toBeVisible();
    });

    it("should render placeholder icon if not found", () => {
      const renderEtherCoinWithFallBack = render(<EtherCoinIconStory coin={"SCAQQFS"} />);
      const etherCoinIconImage = renderEtherCoinWithFallBack.getByRole("img");
      fireEvent.error(etherCoinIconImage);
      const etherCoinIconImageFallBack = renderEtherCoinWithFallBack.getByText("S");
      expect(etherCoinIconImageFallBack).toBeVisible();
    });
  });
});
