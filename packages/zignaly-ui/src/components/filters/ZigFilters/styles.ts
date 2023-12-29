import { Divider } from "@mui/material";
import { Box, styled } from "@mui/system";

export const Layout = styled(Box, { shouldForwardProp: (p) => p !== "mobile" })<{
  label?: string;
  mobile?: boolean;
}>`
  border: 1px dotted ${({ theme }) => theme.palette.neutral600};
  ${({ mobile }) => mobile && `border: none;`}
  ${({ label }) => label && `border-top: none;`}
  border-radius: 5px;
  position: relative;
`;

export const TopDivider = styled(Divider)`
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 2px;
  transform: translateY(-50%);

  &:before,
  &:after {
    border-color: ${({ theme }) => theme.palette.neutral600};
    border-top-style: dotted;
  }
`;

export const DropdownItem = styled(Box, {
  shouldForwardProp: (p) => p !== "active",
})<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.palette.neutral800 : "inherit")};
`;

export const FilterDropdownWrapper = styled(Box, { shouldForwardProp: (p) => p !== "mobile" })<{
  mobile?: boolean;
}>`
  display: flex;

  > div > div {
    padding: ${({ mobile }) => (mobile ? 0 : "10px 20px")};
  }

  hr {
    margin: 10px 0;
  }
`;
