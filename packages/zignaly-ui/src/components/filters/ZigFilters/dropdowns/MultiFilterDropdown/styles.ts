import { Box, styled } from "@mui/system";
import ZigTypography from "components/display/ZigTypography";
import { DropdownItem } from "../../styles";

export const LayoutItem = styled(DropdownItem)`
  display: flex;
  align-items: center;
  gap: 11px;
`;

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
`;
