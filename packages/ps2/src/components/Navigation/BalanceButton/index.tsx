import React, { useMemo } from 'react';
import { Box, Divider, Paper } from '@mui/material';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../../routes';
import { useBalanceQuery } from 'apis/user/api';
import { useActiveExchange } from 'apis/user/use';
import { ChevronRight } from '@mui/icons-material';
import { useInvestmentsQuery } from 'apis/investment/api';
import { BalanceStatus } from './types';
import { useZModal } from 'components/ZModal/use';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';

const BalanceButton = () => {
  const { t } = useTranslation('common');
  const { internalId } = useActiveExchange();
  const { data: investments } = useInvestmentsQuery(internalId);
  const { data: balance } = useBalanceQuery(internalId);
  const { showModal } = useZModal();

  const balanceStatus = useMemo(() => {
    if (!investments || !balance) return null;

    const hasInvested = investments.some(
      (investment) => +investment.investedUSDT > 0,
    );
    if (!hasInvested) {
      if (+balance.totalFreeUSDT) {
        return BalanceStatus.NoInvestments;
      }
      return BalanceStatus.NoFunds;
    }

    return BalanceStatus.Invested;
  }, [investments, balance]);

  if (!balanceStatus) return null;

  const linkWrap = (v: React.ReactElement) =>
    balanceStatus === BalanceStatus.NoFunds ? (
      <div
        onClick={() =>
          showModal(DepositModal, {
            ctaId: 'balance-add-funds-button',
          })
        }
      >
        {v}
      </div>
    ) : (
      <Link
        to={generatePath(
          balanceStatus === BalanceStatus.NoInvestments
            ? ROUTE_PROFIT_SHARING
            : ROUTE_DASHBOARD,
        )}
      >
        {v}
      </Link>
    );

  return linkWrap(
    <Paper
      sx={{
        px: 1,
        py: 0.25,
      }}
    >
      <Box display='flex' alignItems='center'>
        <Box
          sx={{
            display: 'flex',
            ml: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box gap={1} display='flex'>
            <ZigTypography variant='body2' color='neutral300'>
              {t('balance.account-value')}
            </ZigTypography>
            <ZigPriceLabel
              usd
              value={balance.totalWalletUSDT}
              color='neutral100'
              variant='body2'
            />
          </Box>
          <Box gap={1} display='flex'>
            <ZigTypography variant='body2' color='neutral300'>
              {t('balance.available')}
            </ZigTypography>
            <ZigPriceLabel
              usd
              value={balance.totalFreeUSDT}
              color='neutral100'
              variant='body2'
            />
          </Box>
        </Box>
        <Divider
          variant='middle'
          orientation='vertical'
          sx={{
            borderColor: (theme) => theme.palette.neutral600,
            mx: 1.5,
            my: 0,
          }}
          flexItem
        />
        <Box
          display='flex'
          sx={{
            maxWidth: 113,
          }}
          alignItems='center'
        >
          <ZigTypography variant='body2' color='neutral300' textAlign='center'>
            {balanceStatus === BalanceStatus.NoFunds
              ? t('balance.deposit-funds')
              : balanceStatus === BalanceStatus.NoInvestments
              ? t('balance.find-traders')
              : t('balance.my-portfolio')}
          </ZigTypography>
          <ChevronRight />
        </Box>
      </Box>
    </Paper>,
  );
};

export default BalanceButton;
