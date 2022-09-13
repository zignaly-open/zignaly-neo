import styled from 'styled-components';
import { PageContainer } from '@zignaly-open/ui';

export const Layout = styled(PageContainer)`
  width: 100%;
  margin: 0 auto;
  max-width: 1700px;
`;

export const InvestorCounts = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 26px;
`;

export const Center = styled.div`
  display: flex;
  padding: 8em 0;
  align-items: center;
  justify-content: center;
`;
