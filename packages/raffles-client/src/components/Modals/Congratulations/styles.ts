import { styled } from '@mui/system';
import { TextButton } from '@zignaly-open/ui';

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
  display: flex;
`;

export const ContainerDescription = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    padding: 15px 0 0 0;
  }
`;
