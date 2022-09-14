import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
export const FooterContainer = styled('div')`
  background: #101225;
  padding: 30px;
  a {
    text-decoration: none;
    margin-right: 30px;
    &:link {
      color: ${({ theme }) => theme.neutral300};
    }
  }
`;

export const FooterTop = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
`;

export const IconsContainer = styled('div')``;

export const TopNav = styled(Typography)`
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
`;

export const BottomNav = styled(Typography)`
  border-top: 1px solid #303042;
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  a {
    margin-top: 32px;
  }
`;
