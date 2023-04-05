import { styled } from '@mui/material';
import { PageContainer } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';

export const Layout = styled(PageContainer)`
  padding-top: 120px;
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
