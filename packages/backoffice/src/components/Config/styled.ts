import { styled } from '@mui/system';
import { PageContainer } from '@zignaly-open/ui';

export const ConfigWrapper = styled(PageContainer)`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding: 0 100px 40px;
  }

  form {
    width: 100%;
  }
`;
