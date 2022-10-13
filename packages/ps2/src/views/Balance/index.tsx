import React from 'react';
import { MarginContainer, PageContainer } from '@zignaly-open/ui';
import MyBalancesTable from './components/MyBalancesTable';
import BalanceAccountSelector from './components/BalanceAccountSelector';
import { Header } from './styles';

const MyBalances: React.FC = () => {
  return (
    <PageContainer className={'withSubHeader'}>
      <MarginContainer>
        <Header>
          <BalanceAccountSelector />
        </Header>
        <MyBalancesTable />
      </MarginContainer>
    </PageContainer>
  );
};

export default MyBalances;
