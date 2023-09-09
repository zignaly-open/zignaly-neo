import { Box, styled } from "@mui/system";
import ZigInput from "components/inputs/ZigInput";

export const ZigInputStyled = styled(ZigInput)`
  .MuiInput-root {
    border: none;
    padding: 4px 14px;
    min-height: 46px;
    border-radius: 4px;
    &,
    .MuiInput-input {
      background: ${({ theme }) => theme.palette.neutral750};
    }
  }
`;

export const CollapseBox = styled(Box)<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  transform: translateX(100%);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  position: absolute;
  right: 0;
  background: pink;
  position: relative;
  opacity: 0;

  ${({ expanded }) =>
    expanded &&
    `
    opacity: 1;
    transform: translateX(0);
  `}
`;
