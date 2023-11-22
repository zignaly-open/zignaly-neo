import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const Layout = styled('form')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

export const Field = styled('fieldset')`
  border: 0;
  padding: 0 0 4px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const PaddedTitle = styled(ZigTypography)`
  margin-bottom: 35px;
  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    margin-bottom: 10px;
  }
`;
