import { styled } from "@mui/system";

export const MarginContainer = styled("div")`
  margin: 0 auto;
  max-width: 1430px;
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding: 0 22px;
  }
  padding: 0 2px 0;
  width: 100%;
`;

export const PageContainer = styled(MarginContainer)`
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding: 52px 22px 40px;
  }
  padding: 52px 4px 40px;
`;
