import React, { useState } from 'react';
import {
  MarginContainer,
  PageContainer,
  ZigButton,
  ZigTab,
  ZigTabPanel,
  ZigTabs,
} from '@zignaly-open/ui';
import { ZigPlusIcon } from '@zignaly-open/ui/icons';
import MyBalancesTable from './components/MyBalancesTable';
import TransactionHistoryTable from './components/TransactionsHistoryTable';
import BalanceAccountSelector from './components/BalanceAccountSelector';
import { Header, StyledTab, StyledTabs, StyledZigSelect } from './styles';
import { useUpdateEffect } from 'react-use';
import { useTitle } from 'util/title';
import { useTranslation } from 'react-i18next';
import { OpenInNew } from '@mui/icons-material';
import ExportModal from './components/ExportModal';
import { useZModal } from 'components/ZModal/use';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { TRANSACTION_TYPE } from 'apis/coin/types';
import { TRANSACTION_TYPE_NAME } from './components/TransactionsHistoryTable/types';
import { CSSObject } from '@emotion/react';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import DepositModal, {
  useOpenDepositModal,
} from '../Dashboard/components/ManageInvestmentModals/DepositModal';
import { usePrefetchTranslation } from 'util/i18n/i18nextHelpers';
import { ROUTE_MY_BALANCES, ROUTE_MY_BALANCES_TRANSACTIONS } from 'routes';
import { matchPath, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <PageContainer className={'withSubHeader'}>
      <MarginContainer>
        {md ? (
          <>
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
                  onClick={() => navigate(ROUTE_MY_BALANCES)}
                />
                <ZigTab
                  id={'balance__deposits-withdrawals'}
                  label={t('my-balances:deposits-withdrawals')}
                  value={ROUTE_MY_BALANCES_TRANSACTIONS}
                  onClick={() => navigate(ROUTE_MY_BALANCES_TRANSACTIONS)}
                  asideComponent={
                    <Box display='flex' gap={2}>
                      <ZigButton
                        variant={'text'}
                        id={'balance__export'}
                        sx={{
                          '.MuiSvgIcon-root.MuiSvgIcon-root': {
                            fill: theme.palette.links,
                          },
                        }}
                        endIcon={
                          <OpenInNew
                            sx={{ width: '17.33px', height: '17.33px' }}
                          />
                        }
                        onClick={() => {
                          showModal(ExportModal, {
                            type: type !== 'all' ? type : null,
                          });
                        }}
                      >
                        {t('action:export-all')}
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
          </>
        ) : (
          <Box
            display={'flex'}
            width={'100%'}
            flexDirection={'column'}
            alignItems={'center'}
            marginTop={'15px'}
          >
            <StyledTabs
              value={tab}
              onChange={(event, newValue) => {
                setTab(newValue);
              }}
            >
              <StyledTab
                active={tab === ROUTE_MY_BALANCES}
                label={t('my-balances:my-coins')}
                id={'balance__my-coins'}
                value={ROUTE_MY_BALANCES}
                onClick={() => navigate(ROUTE_MY_BALANCES)}
              />
              <StyledTab
                active={tab === ROUTE_MY_BALANCES_TRANSACTIONS}
                id={'balance__deposits-withdrawals'}
                label={t('my-balances:deposits-withdrawals')}
                value={ROUTE_MY_BALANCES_TRANSACTIONS}
                onClick={() => navigate(ROUTE_MY_BALANCES_TRANSACTIONS)}
              />
            </StyledTabs>
          </Box>
        )}
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
