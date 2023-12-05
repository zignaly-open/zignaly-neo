import React from "react";
import ZigQrCode from ".";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/ZigQrCode", () => {
  describe("ZigQrCode rendering", () => {
    it("render with default url", async () => {
      const { container } = renderWithProvidersUi(<ZigQrCode id={"qr-code-test-id"} />);

      const qrCode = container.querySelector("#qr-code-test-id") as Element;
      expect(qrCode).toBeVisible();
      const qrCodeStyles = getComputedStyle(qrCode);
      expect(qrCode).toMatchSnapshot();
      expect(qrCodeStyles).toMatchSnapshot();
    });
    it("render with custom url", async () => {
      const { container } = renderWithProvidersUi(
        <ZigQrCode id={"qr-code-test-id"} url={"https://github.com/zignaly-open/zignaly-neo/"} />,
      );

      const qrCode = container.querySelector("#qr-code-test-id") as Element;
      expect(qrCode).toBeVisible();
      const qrCodeStyles = getComputedStyle(qrCode);
      expect(qrCode).toMatchSnapshot();
      expect(qrCodeStyles).toMatchSnapshot();
    });
    it("render with custom size", async () => {
      const { container } = renderWithProvidersUi(
        <ZigQrCode id={"qr-code-test-id"} width={500} height={500} />,
      );

      const qrCode = container.querySelector("#qr-code-test-id") as Element;
      expect(qrCode).toBeVisible();
      const qrCodeStyles = getComputedStyle(qrCode);
      expect(qrCode).toMatchSnapshot();
      expect(qrCodeStyles).toMatchSnapshot();
    });
    it("render with label", async () => {
      const { container } = renderWithProvidersUi(
        <ZigQrCode id={"qr-code-test-id"} label={"test-label"} className={"test-class"} />,
      );

      const qrCode = container.querySelector(".test-class") as Element;
      expect(qrCode).toBeVisible();
      const qrCodeStyles = getComputedStyle(qrCode);
      expect(qrCode).toMatchSnapshot();
      expect(qrCodeStyles).toMatchSnapshot();
    });
  });
});
