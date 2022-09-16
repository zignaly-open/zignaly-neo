import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';

export const FooterContainer = styled('div')`
  background: #101225;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    text-decoration: none;
    &:link {
      color: ${({ theme }) => theme.neutral000};
    }
    &:visited {
      color: ${({ theme }) => theme.neutral000};
    }
  }
`;

export const FooterTopContainer = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

export const CopyrightContainer = styled(Typography)``;
export const IconsContainer = styled('div')`
  width: 20%;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 800px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const TopNav = styled(Typography)`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  a {
    margin: 20px 75px 30px 0;
  }
  @media (max-width: 800px) {
    a {
      margin: 20px 10px 30px 0;
    }
  }
`;

export const BottomNav = styled(Typography)`
  border-top: 1px solid #303042;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  a {
    margin: 30px 40px 30px 0;
  }
  @media (max-width: 800px) {
    a {
      margin: 20px 10px 30px 0;
    }
  }
`;

export const DisclaimerContainer = styled(Typography)`
  width: 80%;
  text-align: justify;
  display: flex;
  justify-content: center;
  & div {
    width: 50%;
  }
  @media (max-width: 800px) {
    flex-wrap: wrap;
    & div {
      width: 100%;
    }
  }
`;
export const DisclaimerLeft = styled('div')`
  margin-right: 10px;
`;

export const DisclaimerRight = styled('div')``;
