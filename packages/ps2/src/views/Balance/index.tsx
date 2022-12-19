import React, { useCallback, useState } from 'react';
import {
  MarginContainer,
  PageContainer,
  TextButton,
  ZigTab,
  ZigTabPanel,
  ZigTabs,
} from '@zignaly-open/ui';
import MyBalancesTable from './components/MyBalancesTable';
import TransactionHistoryTable from './components/TransactionsHistoryTable';
import BalanceAccountSelector from './components/BalanceAccountSelector';
import { Header, StyledZigSelect } from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import ExportModal from './components/ExportModal';
import { useZModal } from 'components/ZModal/use';
import { Box } from '@mui/material';
import { TRANSACTION_TYPE } from 'apis/coin/types';
import { TRANSACTION_TYPE_NAME } from './components/TransactionsHistoryTable/types';
import { CSSObject } from '@emotion/react';

const MyBalances: React.FC = () => {
  const { t } = useTranslation([
    'pages',
    'my-balances',
    'transactions-history',
  ]);
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
          <TransactionHistoryTable type={type !== 'all' ? type : null} />
        </ZigTabPanel>
      </MarginContainer>
    </PageContainer>
  );
};

export default MyBalances;
