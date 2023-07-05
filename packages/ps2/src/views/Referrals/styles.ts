import { InfoOutlined } from '@mui/icons-material';
import { Box, Grid, Paper, styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

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

// what are you doing stepbox, what if somebody sees us
export const StepBox = styled(Box)`
  padding: 16px;
  img {
    margin-top: 24px;
    width: 100%;
    height: 270px;
    object-fit: contain;
  }
`;

export const StepCounter = styled(Box)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.neutral600};
  flex: 0 0 45px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: 19px;
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
      fill: #7682f7;
    }
  }
`;

export const TierBox = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.palette.neutral600}4d;
  border: 1px solid ${({ theme }) => theme.palette.neutral700};
  margin-left: 60px;
`;

export const BoostBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 18px;
  padding: 6px 16px 6.5px 22px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.greenGraph}1a;

  .MuiTypography-root {
    color: rgba(38, 196, 150, 0.9);
    margin-right: 10px;
    font-weight: 500;
  }
`;

export const BoostChipBox = styled(BoostBox)`
  position: absolute;
  top: -15px;
  right: -15px;
  margin: 0;
  padding: 4px 9px;
  border-radius: 24px;

  .MuiTypography-root {
    margin-left: 6px;
    margin-right: 0;
  }
`;

export const TierBarStyle = styled('div')`
  .MuiTypography-root {
    font-size: 8.5px;
    line-height: 15px;
  }

  && svg {
    height: 10px;
    min-height: 10px;
  }
`;
