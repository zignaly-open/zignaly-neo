import { Grid, Paper, styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const Hr = styled('hr')`
  border-color: ${({ theme }) => theme.palette.neutral600};
  border-width: 0;
  border-bottom-width: 0.5px;
`;

export const TotalBoxBox = styled(Paper)`
  border: 1px solid ${({ theme }) => theme.palette.neutral600};
  width: 200px;
  min-height: 120px;
  margin: 16px;
  padding: 16px 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const TotalBoxValue = styled(ZigTypography)`
  display: block;

  &,
  span {
    color: ${({ theme }) => theme.palette.neutral000};
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
