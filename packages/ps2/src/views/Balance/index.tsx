import React, { useState } from 'react';
import {
  MarginContainer,
  PageContainer,
  ZigButton,
  ZigPlusIcon,
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
import { OpenInNew } from '@mui/icons-material';
import ExportModal from './components/ExportModal';
import { useZModal } from 'components/ZModal/use';
import { Box } from '@mui/material';
import { TRANSACTION_TYPE } from 'apis/coin/types';
import { TRANSACTION_TYPE_NAME } from './components/TransactionsHistoryTable/types';
import { CSSObject } from '@emotion/react';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import DepositModal from '../Dashboard/components/ManageInvestmentModals/DepositModal';

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

  return (
    <PageContainer className={'withSubHeader'}>
      <MarginContainer>
        <Header>
          <Box sx={{ flex: '0 0 100px' }} />
          <BalanceAccountSelector />
          <Box sx={{ flex: '0 0 100px' }}>
            <ZigButton
              id={'balances__deposit-header'}
              startIcon={<ZigPlusIcon width={10} height={10} />}
              sx={{ fontWeight: 600, mb: 1 }}
              variant={'contained'}
              onClick={() =>
                showModal(DepositModal, {
                  ctaId: 'balance-deposit-header-button',
                })
              }
            >
              {t('action:deposit')}
            </ZigButton>
          </Box>
        </Header>
        <Box height='67px' display='flex' alignItems='center'>
          <ZigTabs
            onChange={(_, newValue) => {
              setTab(newValue);
            }}
            value={tab}
          >
            <ZigTab
              label={t('my-balances:my-coins')}
              id={'balance__my-coins'}
            />
            <ZigTab
              id={'balance__deposits-withdrawals'}
              label={t('my-balances:deposits-withdrawals')}
              asideComponent={
                <Box display='flex' gap={2}>
                  <ZigButton
                    variant={'text'}
                    id={'balance__export'}
                    sx={{
                      '.MuiSvgIcon-root.MuiSvgIcon-root': {
                        fill: (theme) => theme.palette.links,
                      },
                    }}
                    endIcon={
                      <OpenInNew sx={{ width: '17.33px', height: '17.33px' }} />
                    }
                    onClick={() => {
                      showModal(ExportModal, {
                        type: type !== 'all' ? type : null,
                      });
                    }}
                  >
                    {t('action:export')}
                  </ZigButton>
                  <StyledZigSelect
                    id={'balances-transaction__select-type'}
                    options={filterOptions}
                    value={type}
                    onChange={setType}
                    styles={{
                      singleValue: (_, state): CSSObject => ({
                        display: state.selectProps.menuIsOpen
                          ? 'none'
                          : 'inline-block',
                        textAlign: 'center',

                        ':after': {
                          content: `'\\A ${t(
                            'transactions-history:filter.max',
                          )}'`,
                          whiteSpace: 'pre',
                        },
                      }),
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

export const MyBalancesDeposit = createZModalRouteElement({
  component: DepositModal,
  ctaId: 'balances-table-row',
});
