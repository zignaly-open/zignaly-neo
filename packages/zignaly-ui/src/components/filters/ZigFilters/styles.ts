import { Box, styled } from "@mui/system";

export const Layout = styled(Box)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.neutral700};
  align-items: center;
  gap: 10px;

  > div > div {
    padding: 16px;
  }
`;

export const DropdownItem = styled(Box)<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.palette.neutral800 : "inherit")};
`;
