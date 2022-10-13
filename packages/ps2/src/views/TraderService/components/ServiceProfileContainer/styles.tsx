import styled, { css } from 'styled-components';
import muiStyled from '@emotion/styled';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Typography } from '@zignaly-open/ui';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';

export const GreySubHeader = styled(Typography)`
  font-weight: 500 !important;
  font-size: 13px !important;
  line-height: 20px !important;
  color: ${(props) => props.theme.neutral200} !important;
  margin-top: 4px;
  white-space: nowrap;
  margin-bottom: 4px;
`;

export const GreySubHeaderHighlight = styled(GreySubHeader)`
  color: ${(props) => props.theme.almostWhite} !important;
`;

export const ServiceHeader = styled(Typography)`
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 28px !important;
  color: ${(props) => props.theme.almostWhite} !important;
`;

export const LiquidatedLabel = muiStyled(Box)`
  border: 1px solid ${(props) => props.theme.redGraphOrError};
  border-radius: 5px;
  
  span {
    text-transform: uppercase
  }
`;

export const StyledVerifiedIcon = styled(VerifiedIcon)`
  fill: ${(props) => props.theme.greenGraph} !important;
  color: ${(props) => props.theme.avatarBack} !important;
  width: 16px !important;
  height: 16px !important;
  vertical-align: sub;
  margin-left: 3px;
  display: inline-block;
`;

const iconStyle = css`
  width: 16px !important;
  height: 16px !important;
  vertical-align: sub;
  margin-right: 3px;
  display: inline-block;
`;

export const StyledCalendarMonthIcon = styled(CalendarMonthIcon)`
  ${iconStyle}
`;

export const StyledPersonIcon = styled(PersonIcon)`
  ${iconStyle}
`;

export const Separator = styled.span`
  margin-left: 13px;
  border-right: 1px solid ${(props) => props.theme.neutral200};
  margin-right: 13px;
  flex: 0 0 1px;
  height: 15px;
`;

export const InvestButtonContainer = styled.div`
  text-align: center;
  height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div span {
    font-weight: 500;
    font-size: 22px !important;
    line-height: 36px !important;
  }
`;

export const InvestButtonWrap = styled.div`
  button > div {
    height: 83px !important;
  }
`;

export const BigNumberWrapper = styled.div`
  & > div span {
    font-weight: 500;
    font-size: 22px !important;
    line-height: 36px !important;
  }
`;

export const InvestButtonSubtext = styled(Typography)`
  font-size: 12px;
  line-height: 16px;
`;
