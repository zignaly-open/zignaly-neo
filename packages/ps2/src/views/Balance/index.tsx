import React from 'react';
import { MarginContainer, PageContainer } from '@zignaly-open/ui';
import MyBalancesTable from './components/MyBalancesTable';
import BalanceAccountSelector from './components/BalanceAccountSelector';
import { Header } from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';

const MyBalances: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('my-balances'));
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
