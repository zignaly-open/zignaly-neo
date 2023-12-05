import React from "react";
import ZigLink from ".";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { fireEvent, waitFor } from "@testing-library/react";

describe("components/inputs/ZigLink", () => {
  describe("renders", () => {
    it("ZigLink render default props", async () => {
      const { container } = renderWithProvidersUi(<ZigLink href={"#"} id={"link-test"} />);

      const link = container.querySelector("#link-test") as Element;
      expect(link).toBeVisible();
      const linkStyles = getComputedStyle(link);
      expect(link).toMatchSnapshot();
      expect(linkStyles).toMatchSnapshot();
    });
  });
  describe("action", () => {
    it("ZigLink handle click", async () => {
      const handleClick = jest.fn();
      const { container } = renderWithProvidersUi(
        <ZigLink href={"#"} id={"link-test"} onClick={handleClick} />,
      );

      const link = container.querySelector("#link-test") as Element;
      fireEvent.click(link);
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
