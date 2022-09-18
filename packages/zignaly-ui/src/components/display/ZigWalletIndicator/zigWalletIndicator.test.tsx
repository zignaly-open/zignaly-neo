import React from "react";
import { render } from "@testing-library/react";

import ZigWalletIndictator, { RankTypesId } from ".";

describe("components/display/ZigWalletIndictator", () => {
  describe("renders", () => {
    it("ZigWalletIndictator shows zigs", () => {
      const container = render(<ZigWalletIndictator zigs={9} />);

      expect(container.getByText("0.000000000000000009")).toBeVisible;
    });
    it("ZigWalletIndictator with dolphin rank", () => {
      const container = render(<ZigWalletIndictator zigs={1} rankId={RankTypesId.DOLPHIN} />);

      expect(container.getByText("Dolphin")).toBeVisible;
      expect(container.getAllByRole("img")).toBeVisible;
    });

    it("ZigWalletIndictator with whale rank", () => {
      const container = render(<ZigWalletIndictator zigs={1} rankId={RankTypesId.WHALE} />);

      expect(container.getByText("Whale")).toBeVisible;
      expect(container.getAllByRole("img")).toBeVisible;
    });
  });
});
