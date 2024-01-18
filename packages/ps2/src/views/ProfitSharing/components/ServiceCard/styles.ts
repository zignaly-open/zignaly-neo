import { Box, css } from '@mui/material';
import { styled } from '@mui/system';
import { ServiceName } from 'views/Dashboard/components/ServiceName';
import InvestButton from 'views/TraderService/components/ServiceProfileContainer/atoms/InvestButton';

export const StyledServiceName = styled(ServiceName)`
  &:nth-child(1) {
    position: relative;
    margin-right: 0;
  }
  div:has(> img) {
    width: 75px;
    height: 75px;
  }
  .MuiTypography-body1 {
    font-size: 18px;
  }
`;

export const Card = styled(Box)`
  width: 340px;
  height: 280px;
  padding: 21px 22px;
  border-radius: 7.5px;
  border: solid 1px ${({ theme }) => theme.palette.neutral700};
  background: radial-gradient(
    circle at center,
    #2c418563 0%,
    #15193663 55%,
    #20202563 100%
  );
  background-color: #0b0b23;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const ButtonContainer = styled(Box)`
  > div > div > div {
    max-height: 66px;
  }
`;
