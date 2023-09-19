import { Box, Grid, Paper, styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { InviteBox } from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralLinkInvite/styles';
import {
  ContainerArrow,
  SliderContainer,
} from 'views/TraderService/components/ReferralsInviteModal/atoms/ShareCommissionSlider/styles';

export const CommissionBox = styled(Paper)`
  border-radius: 17px;
  background-image: linear-gradient(to top, #18194b, #12374e);
  width: 849px;
  height: 354px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 27px;
  padding: 10px 50px;
`;

// Custom borders with left arrow and transparent background
export const StyledShareCommissionSlider = styled('div')`
  position: relative;

  ${ContainerArrow} {
    display: none;
  }

  ${SliderContainer} {
    position: relative;
    width: 356px;
    height: 160px;
    margin: 0;
    border: none;
    border-right: 1px solid rgba(148, 150, 180, 0.1);
    border-radius: 15px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      padding-left: 19px;
      left: -18px;
    }
    &:before {
      bottom: calc(50% + 11px);
      transform: skewY(-50deg);
      border: 1px solid rgba(148, 150, 180, 0.1);
      border-left: none;
      border-right: none;
      border-top: none;
    }

    &:after {
      top: calc(50% + 11px);
      transform: skewY(50deg);
      border: 1px solid rgba(148, 150, 180, 0.1);
      border-left: none;
      border-bottom: none;
      border-right: none;
    }

    > div > .MuiTypography-root {
      font-size: 18.5px;
      font-weight: 500;
      display: flex;
      letter-spacing: 0.56px;
      padding: 0px 20px 8px;
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

export const LimitedTimeChip = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.greenGraph}33;
  height: 27px;
  gap: 5px;
  padding: 5px 13px;
  position: absolute;
  top: -35px;
  right: -19px;

  svg {
    height: 15px;
    width: auto;
  }
`;

export const StyledReferralLinkInvite = styled('div')`
  margin-top: 44px;

  ${InviteBox} {
    background-color: #0d1935;
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
`;

export const TotalBoxValue = styled(ZigTypography)`
  display: block;
  text-align: center;
  margin-top: 17px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.palette.neutral175};

  &,
  span {
    font-size: 36px;
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
