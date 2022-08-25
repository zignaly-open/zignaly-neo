// Dependencies
import React from 'react';

// Components
import { MarginContainer, PageContainer } from '@zignaly-open/ui';
import MyBalancesTable from '../../features/myBalances/components/MyBalancesTable';

const MyBalances: React.FC = () => {
  return (
    <PageContainer className={'withSubHeader'}>
      <MarginContainer>
        <MyBalancesTable />
      </MarginContainer>
    </PageContainer>
  );
};

export default MyBalances;
