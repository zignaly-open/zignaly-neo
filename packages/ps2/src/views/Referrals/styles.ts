import { Box, Grid, Paper, styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { InviteBox } from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralLinkInvite/styles';
import {
  ContainerArrow,
  SliderContainer,
  StyledZigSlider,
} from 'views/TraderService/components/ReferralsInviteModal/atoms/ShareCommissionSlider/styles';

export const CommissionBox = styled(Box)`
  border-radius: 17px;
  background-image: linear-gradient(to bottom, #18194b, #12374e);
  width: 849px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 27px;
  padding: 48px 59px 42px;
`;

export const BaseShareCommissionSlider = styled('div')`
  position: relative;

  ${ContainerArrow} {
    display: none;
  }

  ${SliderContainer} {
    position: relative;
    margin: 0;
    border: none;
    border-radius: 15px;

    &:before,
    &:after {
      content: '';
      position: absolute;
    }
  }

  ${StyledZigSlider} {
    padding: 0 40px;
  }
`;

// Custom borders with left arrow and transparent background
export const StyledShareCommissionSlider = styled(BaseShareCommissionSlider)`
  margin-left: 18px;

  ${SliderContainer} {
    border-right: 1px solid rgba(148, 150, 180, 0.2);
    border-radius: 15px;
    width: 356px;
    height: 160px;

    &:before,
    &:after {
      padding-left: 19px;
      left: -18px;
    }
    &:before {
      bottom: calc(50% + 11px);
      transform: skewY(-50deg);
      border: 1px solid rgba(148, 150, 180, 0.3);
      border-left: none;
      border-right: none;
      border-top: none;
    }

    &:after {
      top: calc(50% + 11px);
      transform: skewY(50deg);
      border: 1px solid rgba(148, 150, 180, 0.3);
      border-left: none;
      border-bottom: none;
      border-right: none;
    }

    > div > .MuiTypography-root {
      font-size: 18.5px;
      padding: 0px 20px 8px;
    }
  }
`;

export const AltShareCommissionSlider = styled(BaseShareCommissionSlider)`
  margin-top: 18px;

  ${SliderContainer} {
    border-bottom: 1px solid rgba(148, 150, 180, 0.2);
    border-radius: 15px;
    width: 428px;
    height: 110px;

    &:before,
    &:after {
      padding-top: 19px;
      top: -18px;
    }

    &:before {
      left: 44px;
      transform: skewX(-50deg);
      border: 1px solid rgba(148, 150, 180, 0.3);
      border-left: none;
      border-top: none;
      border-bottom: none;
    }

    &:after {
      left: 66px;
      transform: skewX(50deg);
      border: 1px solid rgba(148, 150, 180, 0.3);
      border-right: none;
      border-top: none;
      border-bottom: none;
    }

    > div > .MuiTypography-root {
      font-size: 16px;
      padding: 0px 10px 4px;
    }
  }
`;

// Hack for nice rounded borders on the left side between the arrow
export const BorderFix = styled('div')`
  &:before,
  &:after {
    content: '';
    width: 100%;
    border: 1px solid rgba(148, 150, 180, 0.1);
    height: calc(50% - 23px);
    position: absolute;
    border-right: none;
  }

  &:before {
    top: 0;
    border-bottom: none;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  &:after {
    bottom: 0;
    border-top: none;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

export const BorderFixAlt = styled('div')`
  &:before,
  &:after {
    content: '';
    height: 100%;
    border: 1px solid rgba(148, 150, 180, 0.1);
    position: absolute;
    border-bottom: none;
  }

  &:before {
    left: 0;
    width: 33px;
    border-right: none;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &:after {
    left: 77px;
    right: 0;
    border-left: none;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

export const LimitedTimeChip = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.greenGraph}33;
  height: 27px;
  gap: 7px;
  padding: 5px 13px;
  position: absolute;
  top: -36px;
  right: -19px;

  svg {
    height: 15px;
    width: auto;
  }
`;

export const LimitedTimeChipArrow = styled('div')`
  position: absolute;
  bottom: -13px;
  left: calc(50% + 7px);
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 16px solid transparent;
  border-top: 13px solid ${({ theme }) => theme.palette.greenGraph}33;
`;

export const StyledReferralLinkInvite = styled(Box)`
  ${InviteBox} {
    background-color: #0d1935;
  }
`;

export const StyledCurrentCommission = styled('div')`
  min-width: 230px;

  > div > div {
    margin-bottom: 8px;

    > div > .MuiTypography-body1 {
      padding-top: 15px;
    }
  }

  .boost-timer {
    margin-top: 5px;
  }
`;

export const TotalBoxBox = styled(Paper)`
  width: 250px;
  min-height: 160px;
  margin: 16px;
  border-width: 0;
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 11px;
`;

export const TotalBoxValue = styled(ZigTypography)`
  display: block;
  text-align: center;
  margin-top: 17px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.palette.neutral175};

  &,
  span {
    font-size: 29px;
    line-height: 29px;
    font-weight: 600;

    > svg {
      margin-bottom: 3px;
    }
  }
`;

export const FilterWrapperContainer = styled(Grid)`
  justify-content: flex-end;

  &,
  & > .MuiBox-root {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }

  .zig-react-select__control {
    width: 150px;
  }
`;

export const GetWhatYouDeserveLabel = styled(ZigTypography)`
  display: block;
  text-align: center;
`;

export const StepBox = styled(Box)`
  padding: 16px;

  img {
    width: 100%;
    height: 265px;
    object-fit: contain;
  }
`;

export const StepCounter = styled(Box)`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.neutral600};
  flex: 0 0 56px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: 26px;
`;

export const RewardsListContainer = styled(Grid)`
  max-width: 900px;
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.palette.neutral700};
  border-bottom: 1px solid ${({ theme }) => theme.palette.neutral700};
  background-color: rgba(255, 255, 255, 0.02);
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const UlList = styled('ul')`
  &,
  & li {
    list-style: disc;
  }
  margin-left: 20px;
`;

export const OlList = styled('ol')`
  &,
  & li {
    list-style: decimal;
  }
  margin-left: 20px;
`;

export const ShareIconsContainer = styled(Box)`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  display: grid;
  svg {
    min-width: 40px;
    width: 100%;
    height: 40px;
    margin-top: 6px;
    margin-bottom: 6px;
    margin-left: 6px;
    margin-right: 6px;
    fill: url(#shareIconGradient);
    transition: fill 0.2s;
    &:hover {
      fill: ${({ theme }) => theme.palette.highlighted};
    }
  }
`;

export const HowToEarnBox = styled(Box)`
  border-radius: 17px;
  width: 100%;
  padding: 25px;
  position: relative;
  overflow: hidden;
  background: rgba(12, 14, 37, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 17px;
    border: 1px solid transparent;
    background: linear-gradient(180deg, #138ea0cc, #3f3bb1cc) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export const TiersCardBox = styled(Box)`
  background-image: linear-gradient(to bottom, #09122acc, #09122acc, #142f4dcc);
  padding: 10px;
  width: 244px;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
`;
