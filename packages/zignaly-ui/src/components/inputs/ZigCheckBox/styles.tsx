import { styled, Box } from "@mui/material";

import { ReactComponent as CheckmarkIcon } from "assets/icons/checkmark-active-icon.svg";

export const Icon = styled(CheckmarkIcon)`
  width: 10px;
  height: 10px;
  position: relative;
  ${({ theme }) => `fill: ${theme.palette.highlighted};`}
`;

export const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.neutral800};
  border: 1px dotted ${({ theme }) => theme.palette.neutral400};
  border-radius: 2.5px;
  position: relative;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  overflow: hidden;
`;
