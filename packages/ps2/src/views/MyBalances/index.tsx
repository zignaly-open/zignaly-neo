import React from 'react';
import { MarginContainer, PageContainer } from '@zignaly-open/ui';
import MyBalancesTable from '../../features/myBalances/components/MyBalancesTable';
import AccountSelector from '../../features/myBalances/components/AccountSelector';
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
