import { styled, css, Grid, Divider } from '@mui/material';
import muiStyled from '@emotion/styled';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ZigTypography } from '@zignaly-open/ui';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { isSafari } from 'react-device-detect';
import { Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

export const LinkIconWithSafariFix = muiStyled(LinkIcon)`
  width: 13px !important;
  height: 13px !important; 
`;

export const GreySubHeader: typeof ZigTypography = muiStyled(ZigTypography)`
  font-weight: 500 !important;
  font-size: 13px !important;
  line-height: 20px !important;
  color: ${(props) => props.theme.palette.neutral200} !important;
  margin-top: 4px;
  white-space: nowrap;
  margin-bottom: 4px;
`;

export const GreySubHeaderHighlight = styled(GreySubHeader)`
  // no highlight lol
`;

export const LiquidatedLabel = muiStyled(Box)`
  border: 1px solid ${(props) => props.theme.palette.redGraphOrError};
  border-radius: 5px;
  
  span {
    text-transform: uppercase
  }
`;

export const StyledMarkdownWrapper = styled(Box)`
  ul,
  ol {
    margin-bottom: 16px;
    font-size: 15px;
  }
`;

export const StyledVerifiedIcon = styled(VerifiedIcon)`
  fill: ${(props) => props.theme.palette.greenGraph} !important;
  color: ${(props) => props.theme.palette.avatarBack} !important;
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

export const Separator = styled('span')`
  margin-left: 13px;
  margin-right: 13px;
  flex: 0 0 1px;
  height: 15px;
`;

export const InvestButtonContainer = styled(Box)`
  border: 1px dotted ${({ theme }) => theme.palette.neutral600};
  border-top: none;
  align-items: center;
  padding: 15px 25px;
  position: relative;
  border-radius: 5px;
  text-align: center;
  height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.xl}px) {
    padding: 15px 8px;
  }
`;

export const TopDivider = styled(Divider)`
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 3px;
  transform: translateY(-50%);

  &:before,
  &:after {
    border-color: ${({ theme }) => theme.palette.neutral600};
    border-top-style: dotted;
  }
`;

export const BigNumberWrapper = styled('div')`
  & > div span {
    font-weight: 500;
  }
`;

export const HideReadMoreEffects = styled(Box)<{
  truncate: boolean;
  lines: number;
}>`
  transition: all 0.3s;
  margin-bottom: 7px;

  & ol {
    padding-inline-start: 20px !important;
  }

  ${({ truncate, lines }) =>
    truncate &&
    css`
      -webkit-line-clamp: ${lines};
      ${isSafari ? `max-height: 150px;` : ''};
      height: 100%;
      width: 100%;
      -webkit-box-orient: vertical;
      display: ${isSafari ? 'block' : '-webkit-box'};
      overflow-y: hidden;
      overflow-wrap: break-word;
      text-overflow: ellipsis;
    `}
`;

export const MarkdownContainer = styled('div')`
  * {
    color: ${({ theme }) => theme.palette.neutral200};
  }

  hr {
    color: transparent;
    border-top: 0.5px dashed ${({ theme }) => theme.palette.neutral500};
    border-bottom-width: 0 !important;
  }

  ul,
  ol {
    padding-inline-start: 15px;
  }

  ul > li {
    list-style-type: disc;
  }
  ol > li {
    list-style-type: decimal;
  }

  img {
    max-width: 100%;
  }

  p {
    margin-bottom: 16px;
  }
`;

export const GridWithBottomBorder = styled(Grid)`
  border-bottom: 0.5px solid ${({ theme }) => theme.palette.neutral700};
`;

export const GridCell = styled(Grid)<{ rightBorder?: boolean }>`
  text-align: center;
  border-right: 0.5px solid
    ${({ theme, rightBorder }) =>
      rightBorder ? theme.palette.neutral700 : 'transparent'};

  & > span:first-child {
    display: block;
  }
`;

export const PercentChangeContainer: typeof ZigTypography = styled(
  ZigTypography,
)`
  justify-content: center;
  display: flex;
  white-space: nowrap;
  flex-direction: row;
`;

export const RightSideActionWrapper = styled(Box)<{
  isAuthenticated?: boolean;
}>`
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    display: flex;
    position: fixed;
    bottom: ${({ isAuthenticated }) => (isAuthenticated ? '56px' : '0')};
    left: 0;
    align-items: flex-start;
    height: 87px;
    min-height: unset;
    width: 100%;
    padding: 10px 3px 5px 3px;
    flex-direction: row;
    background-color: ${({ theme }) => theme.palette.neutral900};
    z-index: 5;
  }
`;

export const ChartWrapper = styled(Box)`
  display: flex;
  margin-left: -20px;
  min-height: 306px;
  align-items: center;
  justify-content: center;
`;

export const ChangeIndicatorSmall = styled(ZigTypography)`
  position: relative;
  top: -1.5px;
  font-size: 12px !important;
`;

export const ServiceInfoWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.backgrounds.activeTab};
  padding: 10px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  flex: 0 1 111px;
  & > :first-child {
    margin-bottom: 0;
    text-align: center;
  }
`;

export const SqueezedButtonGroupWrapper = styled(Box)`
  > div {
    height: 45px;
  }

  .MuiButton-root {
    min-width: 50px !important;
    padding-left: 18px;
    padding-right: 18px;
  }
`;

export const SelectWrapperBox = styled(Box)`
  .zig-react-select__control {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    height: 45px;
  }
`;
