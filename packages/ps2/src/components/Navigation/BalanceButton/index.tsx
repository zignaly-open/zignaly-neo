import React, { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import { ZigButton, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
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
import { GradientBorderButtonWrapper } from '../ReferralButton/atoms';

const BalanceButton = () => {
  const { t } = useTranslation('common');
  const { internalId } = useActiveExchange();
  const { data: investments } = useInvestmentsQuery(internalId);
  const { data: balance } = useBalanceQuery(internalId);
  const { showModal } = useZModal();

  const investedAmount = useMemo(() => {
    return investments?.reduce(
      (total, investment) =>
        total + +investment.investedUSDT + +investment.pendingUSDT,
      0,
    );
  }, [investments]);

  const balanceStatus = useMemo(() => {
    if (!investments || !balance) return null;

    if (!investedAmount) {
      return +balance.totalFreeUSDT
        ? BalanceStatus.NoInvestments
        : BalanceStatus.NoFunds;
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
    <GradientBorderButtonWrapper>
      <ZigButton
        id='menu__balance-link'
        component={'a'}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          px: 1,
          py: 0.5,
        }}
        variant='outlined'
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
            <Box gap={1} display='flex' justifyContent='space-between'>
              <ZigTypography variant='body2' color='neutral300' fontSize='12px'>
                {t('balance.total')}
              </ZigTypography>
              <ZigPriceLabel
                usd
                value={investedAmount + balance.totalFreeUSDT}
                color='neutral100'
                variant='body2'
                fontSize='12px'
              />
            </Box>
            <Box gap={1} display='flex' justifyContent='space-between'>
              <ZigTypography variant='body2' color='neutral300' fontSize='12px'>
                {t('balance.available')}
              </ZigTypography>
              <ZigPriceLabel
                usd
                value={balance.totalFreeUSDT}
                color='neutral100'
                variant='body2'
                fontSize='12px'
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
            <ZigTypography
              variant='body2'
              color='neutral300'
              textAlign='center'
              fontSize='12px'
            >
              {balanceStatus === BalanceStatus.NoFunds
                ? t('balance.deposit-funds')
                : balanceStatus === BalanceStatus.NoInvestments
                ? t('balance.find-traders')
                : t('balance.my-portfolio')}
            </ZigTypography>
            <ChevronRight />
          </Box>
        </Box>
      </ZigButton>
    </GradientBorderButtonWrapper>,
  );
};

export default BalanceButton;
