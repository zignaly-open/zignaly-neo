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
import { useTitle, useUpdateEffect } from 'react-use';
import { useTranslation } from 'react-i18next';
import { OpenInNew } from '@mui/icons-material';
import ExportModal from './components/ExportModal';
import { useZModal } from 'components/ZModal/use';
import { Box } from '@mui/material';
import { TRANSACTION_TYPE } from 'apis/coin/types';
import { TRANSACTION_TYPE_NAME } from './components/TransactionsHistoryTable/types';
import { CSSObject } from '@emotion/react';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import DepositModal, {
  useOpenDepositModal,
} from '../Dashboard/components/ManageInvestmentModals/DepositModal';
import { usePrefetchTranslation } from 'util/i18nextHelpers';
import { ROUTE_MY_BALANCES, ROUTE_MY_BALANCES_TRANSACTIONS } from 'routes';
import { Link, generatePath, matchPath } from 'react-router-dom';

const matchRoute = () =>
  [ROUTE_MY_BALANCES_TRANSACTIONS, ROUTE_MY_BALANCES].find((tab) =>
    matchPath({ path: tab, end: false }, location.pathname),
  );

const MyBalances: React.FC = () => {
  const { t } = useTranslation([
    'pages',
    'my-balances',
    'transactions-history',
  ]);
  useTitle(t('my-balances'));
  usePrefetchTranslation(['withdraw-crypto', 'deposit-crypto']);

  useUpdateEffect(() => {
    // On url change, find the matching tab and set it as the active tab
    setTab(matchRoute());
  }, [location.pathname]);

  const [tab, setTab] = useState(matchRoute());
  const openDepositModal = useOpenDepositModal();
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
              onClick={() => openDepositModal()}
            >
              {t('action:deposit')}
            </ZigButton>
          </Box>
        </Header>
        <Box height='67px' display='flex' alignItems='center'>
          <ZigTabs
            value={tab}
            onChange={(event, newValue) => {
              setTab(newValue);
            }}
          >
            <ZigTab
              label={t('my-balances:my-coins')}
              id={'balance__my-coins'}
              value={ROUTE_MY_BALANCES}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              to={generatePath(ROUTE_MY_BALANCES)}
              component={Link}
            />
            <ZigTab
              id={'balance__deposits-withdrawals'}
              label={t('my-balances:deposits-withdrawals')}
              value={ROUTE_MY_BALANCES_TRANSACTIONS}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              component={Link}
              to={generatePath(ROUTE_MY_BALANCES_TRANSACTIONS)}
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
        <ZigTabPanel value={tab} index={ROUTE_MY_BALANCES}>
          <MyBalancesTable />
        </ZigTabPanel>
        <ZigTabPanel value={tab} index={ROUTE_MY_BALANCES_TRANSACTIONS}>
          <TransactionHistoryTable type={type !== 'all' ? type : null} />
        </ZigTabPanel>
      </MarginContainer>
    </PageContainer>
  );
};

export default MyBalances;

export const MyBalancesDeposit = createZModalRouteElement({
  component: DepositModal,
});
