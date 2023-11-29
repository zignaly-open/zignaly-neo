import React from "react";
import Toaster from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/Toaster", () => {
  describe("renders", () => {
    it("Toaster render", async () => {
      const { container } = renderWithProvidersUi(<Toaster id={"toaster"} />);

      const toaster = container.querySelector("#toaster") as Element;
      expect(toaster).toBeVisible();
      const toasterStyles = getComputedStyle(toaster);
      expect(toaster).toMatchSnapshot();
      expect(toasterStyles).toMatchSnapshot();
    });
    it("Toaster render small size", async () => {
      const { container } = renderWithProvidersUi(<Toaster size={"small"} id={"toaster"} />);

      const toaster = container.querySelector("#toaster") as Element;
      expect(toaster).toBeVisible();
      const toasterStyles = getComputedStyle(toaster);
      expect(toaster).toMatchSnapshot();
      expect(toasterStyles).toMatchSnapshot();
    });
    it("Toaster render success variant", async () => {
      const { container } = renderWithProvidersUi(<Toaster variant={"success"} id={"toaster"} />);

      const toaster = container.querySelector("#toaster") as Element;
      expect(toaster).toBeVisible();
      const toasterStyles = getComputedStyle(toaster);
      expect(toaster).toMatchSnapshot();
      expect(toasterStyles).toMatchSnapshot();
    });
    it("Toaster render info variant", async () => {
      const { container } = renderWithProvidersUi(<Toaster variant={"info"} id={"toaster"} />);

      const toaster = container.querySelector("#toaster") as Element;
      expect(toaster).toBeVisible();
      const toasterStyles = getComputedStyle(toaster);
      expect(toaster).toMatchSnapshot();
      expect(toasterStyles).toMatchSnapshot();
    });
  });
});
