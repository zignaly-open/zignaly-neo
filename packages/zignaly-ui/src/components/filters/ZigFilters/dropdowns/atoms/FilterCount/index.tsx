import { FontStyle } from "@mui/material/styles/createTypography";
import { css, styled } from "@mui/system";
import ZigTypography from "components/display/ZigTypography";

export const FiltersCount = styled(ZigTypography)`
  background: ${({ theme }) => theme.palette.neutral500};
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.links};
  font-weight: 600;
  font-size: 12px;
  border-radius: 50%;
  ${({ theme }) =>
    (theme.typography as FontStyle)?.fontFamily?.includes("Avenir Next") &&
    css`
      /* Avoid Avenir Next due to bottom margin centering issue */
      font-family: Roboto, Helvetica, Arial;
    `};
  letter-spacing: normal;
`;
