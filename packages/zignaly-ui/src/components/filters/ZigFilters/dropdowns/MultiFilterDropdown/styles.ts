import { Box, styled } from "@mui/system";

export const LayoutItem = styled(Box)<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.palette.neutral800 : "inherit")};
`;
