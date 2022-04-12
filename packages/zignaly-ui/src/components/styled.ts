// Dependencies
import styled from "styled-components";

// Utils
import { styledIf } from "utils/styled";

// Types
import { ButtonVariants, ButtonSizes } from "./inputs/Button";

export const ButtonGroup = styled.div`
  display: grid;

  ${(props: any) => `
    grid-template-columns: repeat(${props.children.length}, minmax(0%, 100%));
    gap: 8px;
  `}
`;

export const Button = styled.button<{ size: ButtonSizes; variant: ButtonVariants }>`
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

  ${(props: any) => `
    ${styledIf(
      props.size === ButtonSizes.SMALL,
      `
      padding: 8px 18px;
    `,
    )}
  
    ${styledIf(
      props.variant === ButtonVariants.PRIMARY,
      `
      background-color: red;
    `,
    )}  
    
    ${styledIf(
      props.variant !== ButtonVariants.GHOST,
      `
      cursor: pointer;
    `,
    )}
  `};
`;
