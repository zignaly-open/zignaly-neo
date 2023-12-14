import React from "react";
import { Loader, CenteredLoader } from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/Loader", () => {
  describe("Loader", () => {
    it("should render with default props without crashing", () => {
      const { container } = renderWithProvidersUi(<Loader />);

      const loader = container.querySelector(".simple-loader") as Element;
      expect(loader).toBeVisible();
      const loaderStyles = getComputedStyle(loader);
      expect(loader).toMatchSnapshot();
      expect(loaderStyles).toMatchSnapshot();
    });

    it("should render with custom width and height without crashing", () => {
      const { container } = renderWithProvidersUi(<Loader width={50} height={50} />);

      const loader = container.querySelector(".simple-loader") as Element;
      expect(loader).toBeVisible();
      const loaderStyles = getComputedStyle(loader);
      expect(loader).toMatchSnapshot();
      expect(loaderStyles).toMatchSnapshot();
    });
  });

  describe("CenteredLoader", () => {
    it("should render with default props without crashing", () => {
      const { container } = renderWithProvidersUi(<CenteredLoader />);

      const loader = container.querySelector(".centered-loader-wrapper") as Element;
      expect(loader).toBeVisible();
      const loaderStyles = getComputedStyle(loader);
      expect(loader).toMatchSnapshot();
      expect(loaderStyles).toMatchSnapshot();
    });
  });
});
