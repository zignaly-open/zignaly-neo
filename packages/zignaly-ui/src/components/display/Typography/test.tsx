// @ts-nocheck
// Dependencies
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Component
import Typography from ".";

describe("components/display/Typography", () => {
  it("renders the typography with the class and h1 tag", () => {
    const { container } = render(<Typography variant={"h1"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("h1")).toBe(true);
  });

  it("renders the typography with the class and h2 tag", () => {
    const { container } = render(<Typography variant={"h2"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("h2")).toBe(true);
  });

  it("renders the typography with the class and h3 tag", () => {
    const { container } = render(<Typography variant={"h3"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("h3")).toBe(true);
  });

  it("renders the typography with the class and h4 tag", () => {
    const { container } = render(<Typography variant={"h4"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("h4")).toBe(true);
  });

  it("renders the typography with the class and h5 tag", () => {
    const { container } = render(<Typography variant={"h5"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("h5")).toBe(true);
  });

  it("renders the typography with the class body1 and tag span", () => {
    const { container } = render(<Typography variant={"body1"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("body1")).toBe(true);
  });

  it("renders the typography with the class body and tag span", () => {
    const { container } = render(<Typography variant={"body2"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("body2")).toBe(true);
  });

  it("renders the typography with the class body and tag span", () => {
    const { container } = render(<Typography variant={"inputl"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("inputl")).toBe(true);
  });

  it("renders the typography with the class body and tag span", () => {
    const { container } = render(<Typography variant={"inputm"}>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("inputm")).toBe(true);
  });

  it("renders the typography with the class body and tag span when no variant is provided", () => {
    const { container } = render(<Typography>Example Test</Typography>);

    const tag = container.querySelector("span");
    expect(tag).toBeVisible();

    expect(container.firstChild.classList.contains("body1")).toBe(true);
  });

  it("renders the typography with the content in the children.", () => {
    render(<Typography variant={"body"}>Example Test</Typography>);
    expect(screen.getByText("Example Test"));
  });

  it("renders the typography with a custom component.", () => {
    const { container } = render(
      <Typography variant={"body"} component={"code"}>
        Example Test
      </Typography>,
    );

    const tag = container.querySelector("code");
    expect(tag).toBeVisible();
  });
});
