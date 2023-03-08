import { Grid, Paper, styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';

export const Hr = styled('hr')`
  border-color: ${({ theme }) => theme.palette.neutral600};
  border-width: 0;
  border-bottom-width: 0.5px;
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
  margin-top: 0;
  margin-bottom: 0;

  &,
  span {
    font-size: 30px;
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
  margin: 15px;
`;

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
