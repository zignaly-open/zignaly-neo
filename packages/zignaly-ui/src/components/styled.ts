// Dependencies
import styled from "styled-components";

// Utils
import { styledIf } from "utils/styled";

// Types
import { buttonVariants, buttonSizes } from "./inputs/Button/types";

export const ButtonGroup = styled.div`
  display: grid;

  ${(props: any) => `
    grid-template-columns: repeat(${props.children.length}, minmax(0%, 100%));
    gap: 8px;
  `}
`;

export const Button = styled.button<{
  size: keyof typeof buttonSizes;
  variant: keyof typeof buttonVariants;
}>`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  user-select: none;
  white-space: nowrap;

  &[disabled] {
    cursor: default;
  }

  ${(props) => `
    ${styledIf(
      props.size === "small",
      `
      padding: 8px 18px;
    `,
    )}
  
    ${styledIf(
      props.variant === "primary",
      `
      background-color: red;
    `,
    )}  
  `};
`;
