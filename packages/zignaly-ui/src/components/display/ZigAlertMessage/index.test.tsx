import React from "react";
import ZigAlertMessage, { ErrorMessage } from "./index";
import { renderWithProvidersUi } from "../../../utils/testConfig";

describe("components/display/ZigAlertMessage", () => {
  it("renders as an alert", async () => {
    const { container } = renderWithProvidersUi(
      <ZigAlertMessage text={"test text"} id={"alert"} />,
    );

    const alert = container.querySelector("#alert") as Element;
    expect(alert).toBeVisible();
    const alertStyles = getComputedStyle(alert);
    expect(alert).toMatchSnapshot();
    expect(alertStyles).toMatchSnapshot();
  });

  it("renders as a warning", async () => {
    const { container } = renderWithProvidersUi(
      <ZigAlertMessage warning text={"test text"} id={"alert"} />,
    );

    const alert = container.querySelector("#alert") as Element;
    expect(alert).toBeVisible();
    const alertStyles = getComputedStyle(alert);
    expect(alert).toMatchSnapshot();
    expect(alertStyles).toMatchSnapshot();
  });

  it("renders as error", async () => {
    const { container } = renderWithProvidersUi(<ErrorMessage text={"test text"} id={"error"} />);

    const error = container.querySelector("#error") as Element;
    expect(error).toBeVisible();
    const errorStyles = getComputedStyle(error);
    expect(error).toMatchSnapshot();
    expect(errorStyles).toMatchSnapshot();
  });
});
