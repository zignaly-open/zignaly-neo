import React, { useState } from 'react';
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
import { Header } from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import ExportModal from './components/ExportModal';
import { useZModal } from 'components/ZModal/use';

const MyBalances: React.FC = () => {
  const { t } = useTranslation(['pages', 'my-balances']);
  useTitle(t('my-balances'));
  const [tab, setTab] = useState(0);
  const { showModal } = useZModal();

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
          <ZigTab
            label={t('my-balances:deposits-withdrawals')}
            asideComponent={
              <div>
                <TextButton
                  rightElement={<Add sx={{ color: 'links' }} />}
                  caption={t('action:export')}
                  onClick={() => {
                    showModal(ExportModal);
                  }}
                />
              </div>
            }
          />
        </ZigTabs>
        <ZigTabPanel value={tab} index={0}>
          <MyBalancesTable />
        </ZigTabPanel>
        <ZigTabPanel value={tab} index={1}>
          <TransactionHistoryTable />
        </ZigTabPanel>
      </MarginContainer>
    </PageContainer>
  );
};

export default MyBalances;
