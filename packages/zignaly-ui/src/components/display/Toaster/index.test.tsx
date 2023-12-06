import React from "react";
import Toaster from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/Toaster", () => {
  it("renders with default props", async () => {
    const { container } = renderWithProvidersUi(<Toaster id={"toaster"} />);

    const toaster = container.querySelector("#toaster") as Element;
    expect(toaster).toBeVisible();
    const toasterStyles = getComputedStyle(toaster);
    expect(toaster).toMatchSnapshot();
    expect(toasterStyles).toMatchSnapshot();
  });

  it("renders with small size prop", async () => {
    const { container } = renderWithProvidersUi(<Toaster size={"small"} id={"toaster"} />);

    const toaster = container.querySelector("#toaster") as Element;
    expect(toaster).toBeVisible();
    const toasterStyles = getComputedStyle(toaster);
    expect(toaster).toMatchSnapshot();
    expect(toasterStyles).toMatchSnapshot();
  });

  it("renders with success variant prop", async () => {
    const { container } = renderWithProvidersUi(<Toaster variant={"success"} id={"toaster"} />);

    const toaster = container.querySelector("#toaster") as Element;
    expect(toaster).toBeVisible();
    const toasterStyles = getComputedStyle(toaster);
    expect(toaster).toMatchSnapshot();
    expect(toasterStyles).toMatchSnapshot();
  });

  it("renders with info variant prop", async () => {
    const { container } = renderWithProvidersUi(<Toaster variant={"info"} id={"toaster"} />);

    const toaster = container.querySelector("#toaster") as Element;
    expect(toaster).toBeVisible();
    const toasterStyles = getComputedStyle(toaster);
    expect(toaster).toMatchSnapshot();
    expect(toasterStyles).toMatchSnapshot();
  });
});
