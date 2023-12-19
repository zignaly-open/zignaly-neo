import { styled } from "@mui/system";
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
  /* font fix... */
  padding-left: 1px;
  padding-top: 1px;
`;
