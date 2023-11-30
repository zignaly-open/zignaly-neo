import React from "react";
import ZigTypography from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/ZigTypography", () => {
  describe("renders", () => {
    it("ZigTypography render", async () => {
      const { container } = renderWithProvidersUi(
        <ZigTypography id={"typography"}></ZigTypography>,
      );

      const typography = container.querySelector("#typography") as Element;
      expect(typography).toBeVisible();
      const typographyStyles = getComputedStyle(typography);
      expect(typography).toMatchSnapshot();
      expect(typographyStyles).toMatchSnapshot();
    });
    it("ZigTypography render custom variant", async () => {
      const { container } = renderWithProvidersUi(
        <ZigTypography id={"typography"} variant={"h2"}></ZigTypography>,
      );

      const typography = container.querySelector("#typography") as Element;
      expect(typography).toBeVisible();
      const typographyStyles = getComputedStyle(typography);
      expect(typography).toMatchSnapshot();
      expect(typographyStyles).toMatchSnapshot();
    });
    it("ZigTypography render with sx prop", async () => {
      const { container } = renderWithProvidersUi(
        <ZigTypography id={"typography"} sx={{ mt: "15px", fontSize: "25px" }}></ZigTypography>,
      );

      const typography = container.querySelector("#typography") as Element;
      expect(typography).toBeVisible();
      const typographyStyles = getComputedStyle(typography);
      expect(typography).toMatchSnapshot();
      expect(typographyStyles).toMatchSnapshot();
    });
  });
});
