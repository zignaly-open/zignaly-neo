import { Box, styled } from '@mui/material';
import { Select, Typography } from '@zignaly-open/ui';

export const LayoutContainer = styled(Box)`
  max-width: 1280px;
  margin: 30px auto;
  padding: 0 8px;
`;

export const FiltersContainer = styled('div')`
  margin: 40px 0 18px;
  display: flex;
  position: relative;

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column-reverse;
    margin-top: 0;
  }
`;

export const ProjectsTypography = styled(Typography)`
  position: absolute;
  bottom: 27px;
  font-size: 18px !important;

  ${({ theme }) => theme.breakpoints.down('md')} {
    position: static;
    margin-top: 14px !important;
    text-align: center;
  }
`;

export const StyledSelect = styled(Select)`
  min-width: 150px;

  > div {
    text-align: left;
  }
`;
