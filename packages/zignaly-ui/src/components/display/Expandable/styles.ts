import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Layout = styled.div<{ isExpanded: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;

  ${({ isExpanded }) => `
    ${styledIf(
      isExpanded,
      `
        width: 200px;
    `,
      `
       width: 0px;
    `,
    )}
  `}
`;
