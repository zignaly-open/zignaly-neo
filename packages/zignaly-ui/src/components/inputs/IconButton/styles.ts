// Dependencies
import styled from "styled-components";
import { Button } from "components/styled";
import { styledIf } from "utils/styled";
import { buttonVariantsId } from "types/buttons";

export const Layout = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 38px;
  height: 38px;
  border-radius: 38px;
  background: transparent;

  border: none;

  ${(props) => `
    ${styledIf(
      props.variant !== buttonVariantsId.PLACEHOLDER,
      `
      &:hover {
        background: rgba(255, 255, 255, 0.06);
      } 
    `,
    )}
  `}
`;

export const Icon = styled.img``;
