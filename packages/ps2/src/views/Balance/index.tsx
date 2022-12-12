import React, { useState } from 'react';
import {
  MarginContainer,
  PageContainer,
  ZigTab,
  ZigTabPanel,
  ZigTabs,
} from '@zignaly-open/ui';
import MyBalancesTable from './components/MyBalancesTable';
import TransferHistoryTable from './components/TransactionsHistoryTable';
import BalanceAccountSelector from './components/BalanceAccountSelector';
import { Header } from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';

const MyBalances: React.FC = () => {
  const { t } = useTranslation(['pages', 'my-balances']);
  useTitle(t('my-balances'));
  const [tab, setTab] = useState(0);

  return (
    <PageContainer className={'withSubHeader'}>
      <MarginContainer>
        <Header>
          <BalanceAccountSelector />
        </Header>
        <ZigTabs
          onChange={(_, newValue) => {
            setTab(newValue);
          }}
          value={tab}
        >
          <ZigTab label={t('my-balances:my-coins')} />
          <ZigTab label={t('my-balances:deposits-withdrawals')} />
        </ZigTabs>
        <ZigTabPanel value={tab} index={0}>
          <MyBalancesTable />
        </ZigTabPanel>
        <ZigTabPanel value={tab} index={1}>
          <TransferHistoryTable />
        </ZigTabPanel>
      </MarginContainer>
    </PageContainer>
  );
};

export default MyBalances;
