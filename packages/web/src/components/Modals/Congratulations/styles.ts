import { styled } from "@mui/system";
import { TextButton } from "zignaly-ui";

export const AuctionImage = styled('img')`
  width: 268px;
  height: 209px;
  object-fit: cover;
  box-sizing: border-box;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

export const Description = styled(TextButton)`
  padding-left: 0;
`;