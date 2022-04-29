// Dependencies
import styled from "styled-components";
import { Button } from "../../styled";
import { styledIf } from "utils/styled";
import { IconButtonVariants } from "./types";

export const Layout = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 38px;
  height: 38px;
  border-radius: 38px;
  background: transparent;

  border: none;

  ${(props: any) => `
    ${styledIf(
      props.variant !== IconButtonVariants.FLAT,
      `
      &:hover {
        background: rgba(255, 255, 255, 0.06);
      } 
    `,
    )}
  `}
`;

export const Icon = styled.img``;
