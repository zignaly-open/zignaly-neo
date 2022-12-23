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
  const [type, setType] = useState('all');
  const { showModal } = useZModal();

  const filterOptions = [
    { value: 'all', label: t('transactions-history:filter.all') },
  ].concat(
    Object.entries(TRANSACTION_TYPE).map(([, v]) => {
      return {
        value: v,
        label: t(`transactions-history:${TRANSACTION_TYPE_NAME[v]}`),
      };
    }),
  );

  const maxLegend = useCallback(
    (_, state): CSSObject => ({
      display: state.selectProps.menuIsOpen ? 'none' : 'inline-block',
      textAlign: 'center',

      ':after': {
        content: `'\\A ${t('transactions-history:filter.max')}'`,
        whiteSpace: 'pre',
      },
    }),
    [t],
  );

  return (
    <PageContainer className={'withSubHeader'}>
      <MarginContainer>
        <Header>
          <BalanceAccountSelector />
        </Header>
        <Box height='67px' display='flex' alignItems='center'>
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
                <Box display='flex' gap={2}>
                  <TextButton
                    rightElement={<Add sx={{ color: 'links' }} />}
                    caption={t('action:export')}
                    onClick={() => {
                      showModal(ExportModal);
                    }}
                  />
                  <StyledZigSelect
                    options={filterOptions}
                    value={type}
                    onChange={setType}
                    styles={{
                      singleValue: maxLegend,
                    }}
                  />
                </Box>
              }
            />
          </ZigTabs>
        </Box>
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
