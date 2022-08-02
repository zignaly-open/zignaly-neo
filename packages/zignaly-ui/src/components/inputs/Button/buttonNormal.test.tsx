import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

// Info Stories
import * as stories from "./stories";

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level.
const { NormalButton } = composeStories(stories);

describe("inputs/Button", () => {
  describe("stories", () => {
    it("should be rendered NormalButton", () => {
      const { getByRole } = render(<NormalButton />);
      const NormalButtonRendered = getByRole("button");
      expect(NormalButtonRendered).toBeVisible();
    });

    it("should be rendered NormalButton checks color attr", () => {
      const { getByRole } = render(<NormalButton />);
      const NormalButtonRendered = getByRole("button");
      expect(NormalButtonRendered).toHaveAttribute("color", "grey");
    });
    it("should be rendered NormalButton with left element to null", () => {
      const { queryByTestId } = render(<NormalButton />);
      const LeftElementRendered = queryByTestId("button-left-element");
      expect(LeftElementRendered).toBeNull();
    });
    it("should be rendered NormalButton with caption element and text", () => {
      const { queryByTestId } = render(<NormalButton />);
      const CaptionElementRendered = queryByTestId("button-caption-element");
      expect(CaptionElementRendered).toBeVisible();
      expect(CaptionElementRendered).toHaveTextContent("Button");
    });

    it("should be rendered NormalButton with right element to null", () => {
      const { queryByTestId } = render(<NormalButton />);
      const RightElementRendered = queryByTestId("button-right-element");
      expect(RightElementRendered).toBeNull();
    });

    it("should be rendered NormalButton with loader element to null", () => {
      const { queryByTestId } = render(<NormalButton />);
      const LoaderElementRendered = queryByTestId("button-loader-element");
      expect(LoaderElementRendered).toBeNull();
    });

    it("should be rendered NormalButton and clicked", () => {
      const handleClick = jest.fn();
      const { getByRole } = render(<NormalButton onClick={handleClick} />);
      const NormalButtonRendered = getByRole("button");
      fireEvent.click(NormalButtonRendered);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
