import { styled, css, Grid, ButtonGroup } from '@mui/material';
import muiStyled from '@emotion/styled';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ZigTypography } from '@zignaly-open/ui';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

export const ServiceHeader: typeof ZigTypography = styled(ZigTypography)`
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 28px !important;
  color: ${(props) => props.theme.palette.almostWhite} !important;
`;

export const LiquidatedLabel = muiStyled(Box)`
  border: 1px solid ${(props) => props.theme.palette.redGraphOrError};
  border-radius: 5px;
  
  span {
    text-transform: uppercase
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

export const StyledChevronRightIcon = styled(ChevronRightIcon)`
  fill: ${({ theme }) => theme.palette.neutral300};
  margin-top: 1px;
`;

export const StyledPencilIcon = styled(EditIcon)`
  fill: ${({ theme }) => theme.palette.neutral300};
  padding: 3px;
  padding-right: 0;
  margin-top: 1px;
  position: relative;
  left: 2px;
`;

export const Separator = styled('span')`
  margin-left: 13px;
  margin-right: 13px;
  flex: 0 0 1px;
  height: 15px;
`;

export const InvestButtonContainer = styled('div')`
  text-align: center;
  height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BigNumberWrapperInvested = styled('div')`
  span {
    font-weight: 500;
    font-size: 22px !important;
    line-height: 36px !important;
  }
`;

export const InvestButtonWrap = styled('div')`
  text-align: center;
  button > div {
    height: 60px !important;
  }
`;

export const BigNumberWrapper = styled('div')`
  & > div span {
    font-weight: 500;
    font-size: 22px !important;
    line-height: 36px !important;
  }
`;

export const CountryFlag = styled('div')`
  width: 21px;
  height: 14px;
  line-height: 1;
  margin-left: 6px;
`;

export const HideReadMoreEffects = styled('div')<{
  open: boolean;
  heightLimit: number;
}>`
  transition: all 0.3s;
  overflow: hidden;
  margin-bottom: 7px;
  max-height: ${(props) => (props.open ? '100%' : `${props.heightLimit}px`)};
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
`;

export const InvestButtonSubtext: typeof ZigTypography = styled(ZigTypography)`
  font-size: 12px;
  line-height: 16px;
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
    margin-bottom: 10px;
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

export const RightSideActionWrapper = styled(Box)`
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ChartWrapper = styled(Box)`
  display: flex;
  margin-left: -20px;
  min-height: 306px;
  align-items: center;
  justify-content: center;
`;

export const PercentageIndicatorSmall = styled(ZigTypography)`
  position: relative;
  top: -1.5px;
  font-size: 12px !important;
`;

export const GraphPercentageWrapperBox = styled(Box)`
  & > * {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const SqueezedButtonGroup = styled(ButtonGroup)`
  .MuiButton-root {
    min-width: 60px !important;
  }
`;

export const AssetsInPoolWrapper = styled(Box)`
  & > .MuiBox-root > .MuiBox-root:first-child {
    margin-bottom: 8px;
  }
`;

export const SelectWrapperBox = styled(Box)`
  height: 30px;
  .zig-react-select__control {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
`;
