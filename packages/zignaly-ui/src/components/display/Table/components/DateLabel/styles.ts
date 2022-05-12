// Dependencies
import styled from "styled-components";

// Components
import Typography from "components/display/Typography";

// Utils
import { styledIf } from "utils/styled";

export const Layout = styled.div``;

export const Value = styled(Typography)<{ hasLowercase?: boolean }>`
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
