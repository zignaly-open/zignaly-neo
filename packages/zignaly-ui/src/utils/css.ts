import { css } from "styled-components";

export const NiceScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const userHasFont = (font: string): boolean => {
  try {
    return document.fonts.check("14px " + font);
  } catch (e) {
    return false;
  }
};
