import React from "react";
import { Loader, CenteredLoader } from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/inputs/ZigButton", () => {
  describe("renders", () => {
    it("Loader render", async () => {
      const { container } = renderWithProvidersUi(<Loader />);

      const loader = container.querySelector(".simple-loader") as Element;
      expect(loader).toBeVisible();
      const loaderStyles = getComputedStyle(loader);
      expect(loader).toMatchSnapshot();
      expect(loaderStyles).toMatchSnapshot();
    });
    it("Loader custom width and height", async () => {
      const { container } = renderWithProvidersUi(<Loader width={50} height={50} />);

      const loader = container.querySelector(".simple-loader") as Element;
      expect(loader).toBeVisible();
      const loaderStyles = getComputedStyle(loader);
      expect(loader).toMatchSnapshot();
      expect(loaderStyles).toMatchSnapshot();
    });

    it("Centered Loader render", async () => {
      const { container } = renderWithProvidersUi(<CenteredLoader />);

      const loader = container.querySelector(".centered-loader-wrapper") as Element;
      expect(loader).toBeVisible();
      const loaderStyles = getComputedStyle(loader);
      expect(loader).toMatchSnapshot();
      expect(loaderStyles).toMatchSnapshot();
    });
  });
});
