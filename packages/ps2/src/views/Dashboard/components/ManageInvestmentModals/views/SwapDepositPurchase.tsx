import React from 'react';
import {
  CenteredLoader,
  ZigArrowOutIcon,
  ZigButton,
  ZigPlusIcon,
  ZigTypography,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { BUY_CRYPTO_URL } from '../../../../../util/constants';
import { ChooseDepositTypeViews } from '../types';
import ChooseBetweenTwo from './ChooseBetweenTwo';
import SwapForm from '../forms/SwapForm';
import { Box, useTheme } from '@mui/material';
import { SwapDepositPurchaseProps } from '../forms/SwapForm/types';

const SwapDepositPurchase: React.FC<SwapDepositPurchaseProps> = ({
  coin,
  setView,
  isLoadingBalances,
  coinOptionsAllowedSwapFrom,
  setConfirmSwapData,
  setConvertPreviewData,
}) => {
  const { t } = useTranslation('deposit-crypto');
  const theme = useTheme();

  if (isLoadingBalances) {
    return <CenteredLoader />;
  }

  return (
    <>
      <ChooseBetweenTwo
        leftOptionSize={6}
        rightOptionSize={4}
        leftOption={
          <SwapForm
            coinSwapTo={coin}
            coinsAllowedSwapFrom={coinOptionsAllowedSwapFrom}
            setView={setView}
            setConfirmSwapData={setConfirmSwapData}
            setConvertPreviewData={setConvertPreviewData}
          />
        }
        rightOption={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <ZigTypography whiteSpace={'nowrap'}>
              {t('service-swap.deposit-purchase', { coin })}
            </ZigTypography>
            <ZigButton
              onClick={() => setView(ChooseDepositTypeViews.DepositView)}
              id={'modal-swap-deposit-purchase__deposit'}
              variant={'outlined'}
              sx={{ minWidth: '133px' }}
              size={'medium'}
              startIcon={
                <ZigPlusIcon
                  width={'7px'}
                  height={'7px'}
                  style={{ marginBottom: '2px' }}
                  color={theme.palette.neutral300}
                />
              }
            >
              {t('service-deposit.buttons.deposit', { coin })}
            </ZigButton>
            <ZigButton
              size={'medium'}
              variant={'outlined'}
              href={BUY_CRYPTO_URL}
              id={'modal-swap-deposit-purchase__purchase'}
              endIcon={
                <ZigArrowOutIcon
                  width={'7px'}
                  height={'7px'}
                  style={{ marginBottom: '1px' }}
                  color={theme.palette.neutral300}
                />
              }
              sx={{ padding: '8px 20px' }}
            >
              {t('service-deposit.buttons.purchase', { coin })}
            </ZigButton>
          </Box>
        }
        description={t('service-swap.description', { coin })}
        descriptionProps={{ id: 'modal-swap-deposit-purchase__description' }}
      />
    </>
  );
};

export default SwapDepositPurchase;
