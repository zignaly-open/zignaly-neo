import React from 'react';
import { MarginContainer, PageContainer } from '@zignaly-open/ui';
import MyBalancesTable from './components/MyBalancesTable';
import AccountSelector from './components/AccountSelector';
import { Header } from './styles';

const MyBalances: React.FC = () => {
  return (
    <PageContainer className={'withSubHeader'}>
      <MarginContainer>
        <Header>
          <AccountSelector />
        </Header>
        <MyBalancesTable />
      </MarginContainer>
    </PageContainer>
  );
};

export default MyBalances;
