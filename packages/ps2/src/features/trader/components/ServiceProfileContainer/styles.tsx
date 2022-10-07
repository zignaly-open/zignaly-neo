import styled, { css } from 'styled-components';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Typography } from '@zignaly-open/ui';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

export const GreySubHeader = styled(Typography)`
  font-weight: 500 !important;
  font-size: 13px !important;
  line-height: 20px !important;
  color: ${(props) => props.theme.neutral200} !important;
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
`;
