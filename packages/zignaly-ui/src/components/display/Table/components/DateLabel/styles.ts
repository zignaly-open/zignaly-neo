import styled from "styled-components";
import { styledIf } from "utils/styled";
import muiStyled from "@emotion/styled";
import ZigTypography from "../../../ZigTypography";

export const Layout = styled.div``;

export const Value = muiStyled(ZigTypography)<{ hasLowercase?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ hasLowercase }) => `
      ${styledIf(
        hasLowercase,
        `
        text-transform: lowercase;
      `,
      )}
  `}
`;
