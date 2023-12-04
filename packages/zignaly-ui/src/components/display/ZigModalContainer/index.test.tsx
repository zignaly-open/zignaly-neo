import React from "react";
import ZigModalContainer from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";
import { ZigTypography } from "../../../index";
import { fireEvent, waitFor } from "@testing-library/react";

describe("components/display/ZigModalContainer", () => {
  describe("renders", () => {
    it("ZigModalContainer render", async () => {
      const { container } = renderWithProvidersUi(
        <ZigModalContainer>
          <ZigTypography>modal</ZigTypography>
        </ZigModalContainer>,
      );

      const modal = container.querySelector("#modal-container") as Element;
      expect(modal).toBeVisible();
      const modalStyles = getComputedStyle(modal);
      expect(modal).toMatchSnapshot();
      expect(modalStyles).toMatchSnapshot();
    });
  });
  describe("actions", () => {
    it("ZigModalContainer close", async () => {
      const onClick = jest.fn();
      const { container } = renderWithProvidersUi(
        <ZigModalContainer onClickClose={onClick}>
          <ZigTypography>modal</ZigTypography>
        </ZigModalContainer>,
      );

      const closeButton = container.querySelector("#modal__close") as Element;
      const goBackButton = container.querySelector("#modal__back") as Element;
      expect(goBackButton).not.toBeInTheDocument();
      fireEvent.click(closeButton);
      await waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
    it("ZigModalContainer go back", async () => {
      const onClick = jest.fn();
      const { container } = renderWithProvidersUi(
        <ZigModalContainer onGoBack={onClick}>
          <ZigTypography>modal</ZigTypography>
        </ZigModalContainer>,
      );

      const goBackButton = container.querySelector("#modal__back") as Element;
      fireEvent.click(goBackButton);
      await waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
