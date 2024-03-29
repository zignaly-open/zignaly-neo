import React, { useMemo } from 'react';
import { Box, Divider, useTheme } from '@mui/material';
import { ZigButton, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import { ZigCaretRightIcon } from '@zignaly-open/ui/icons';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../../../routes';
import { useBalanceQuery } from 'apis/user/api';
import { useActiveExchange } from 'apis/user/use';
import { useInvestmentsQuery } from 'apis/investment/api';
import { BalanceStatus } from './types';
import { useOpenDepositModal } from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import { ButtonWrapper } from './styles';

const BalanceButton = () => {
  const { t } = useTranslation('common');
  const exchange = useActiveExchange();
  const openDepositModal = useOpenDepositModal();
  const theme = useTheme();
  const { data: investments } = useInvestmentsQuery(exchange?.internalId, {
    skip: !exchange?.internalId,
  });
  const { data: balance } = useBalanceQuery(
    {
      exchangeInternalId: exchange?.internalId,
    },
    {
      pollingInterval: 60 * 1000,
      skip: !exchange?.internalId,
    },
  );

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
      return +balance.totalUSDT
        ? BalanceStatus.NoInvestments
        : BalanceStatus.NoFunds;
    }

    return BalanceStatus.Invested;
  }, [investments, balance]);

  if (!balanceStatus) return null;

  const linkWrap = (v: React.ReactElement) =>
    balanceStatus === BalanceStatus.NoFunds ? (
      <div onClick={() => openDepositModal()}>{v}</div>
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

  if (!exchange) return null;

  return linkWrap(
    <ButtonWrapper>
      <ZigButton
        id='menu__balance-link'
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
            <Box
              gap={1}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <ZigTypography
                variant='body2'
                color='neutral300'
                fontSize='12px'
                lineHeight='16px'
                id='top-widget__portolio-label'
              >
                {t('balance.portfolio')}
              </ZigTypography>
              <ZigPriceLabel
                id='top-widget__portolio-amount'
                usd
                value={investedAmount}
                color='neutral100'
                variant='body2'
                fontSize='12px'
                lineHeight='16px'
                fontWeight={400}
              />
            </Box>
            <Box
              gap={1}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <ZigTypography
                variant='body2'
                color='neutral300'
                fontSize='11px'
                lineHeight='16px'
                id='top-widget__available-label'
              >
                {t('balance.available')}
              </ZigTypography>
              <ZigPriceLabel
                id='top-widget__available-amount'
                usd
                value={balance.totalUSDT}
                color='neutral100'
                variant='body2'
                fontSize='11px'
                lineHeight='16px'
                fontWeight={400}
              />
            </Box>
          </Box>
          <Divider
            variant='middle'
            orientation='vertical'
            sx={{
              borderColor: (muiTheme) => muiTheme.palette.neutral600,
              borderStyle: 'dotted',
              mx: 1.5,
              my: '7px',
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
              textAlign='center'
              color='neutral300'
              fontSize='11px'
              lineHeight='16px'
              sx={{ mr: 0.5 }}
              id='top-widget__link'
            >
              {balanceStatus === BalanceStatus.NoFunds
                ? t('balance.deposit-funds')
                : balanceStatus === BalanceStatus.NoInvestments
                ? t('balance.find-traders')
                : t('balance.my-portfolio')}
            </ZigTypography>
            <ZigCaretRightIcon
              color={theme.palette.neutral300}
              width={12}
              height={12}
            />
          </Box>
        </Box>
      </ZigButton>
    </ButtonWrapper>,
  );
};

export default BalanceButton;
