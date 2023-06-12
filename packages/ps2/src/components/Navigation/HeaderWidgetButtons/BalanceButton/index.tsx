import React, { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import {
  ZigButton,
  ZigCaretRightIcon,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../../../routes';
import { useBalanceQuery } from 'apis/user/api';
import { useActiveExchange } from 'apis/user/use';
import { useInvestmentsQuery } from 'apis/investment/api';
import { BalanceStatus } from './types';
import { useZModal } from 'components/ZModal/use';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import theme from '../../../../theme';
import { ButtonWrapper } from './styles';

const BalanceButton = () => {
  const { t } = useTranslation('common');
  const { internalId } = useActiveExchange();
  const { data: investments } = useInvestmentsQuery(internalId);
  const { data: balance } = useBalanceQuery(
    {
      exchangeInternalId: internalId,
    },
    {
      pollingInterval: 60 * 1000,
    },
  );
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
              >
                {t('balance.portfolio')}
              </ZigTypography>
              <ZigPriceLabel
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
              >
                {t('balance.available')}
              </ZigTypography>
              <ZigPriceLabel
                usd
                value={balance.totalFreeUSDT}
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
              sx={{ mr: 0.5 }}
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
