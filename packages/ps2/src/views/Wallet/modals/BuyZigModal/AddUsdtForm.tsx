import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import ExchangesTooltip from './atoms/ExchangesTooltip';
import { Box, Divider, Grid } from '@mui/material';
import { BUY_CRYPTO_URL } from 'util/constants';
import { AddUsdtFormProps } from './types';
import { NorthEast } from '@mui/icons-material';
import { useZModal } from 'components/ZModal/use';
import { useTranslation, Trans } from 'react-i18next';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import { UsdButtonChoice } from './styles';

const AddUsdtForm = ({ close }: AddUsdtFormProps) => {
  const { t } = useTranslation('wallet');
  const { showModal } = useZModal();

  return (
    <>
      <ZigTypography my={1}>
        {t('buy.deposit.description', { coin: 'USDT' })}
        <br />
        <Trans
          i18nKey='buy.description'
          t={t}
          values={{
            coin: 'USDT',
            max: '5,000',
          }}
        >
          <ExchangesTooltip />
        </Trans>
      </ZigTypography>

      <Grid display='flex' container mt={5} gap={{ xs: 5, sm: 0 }}>
        <UsdButtonChoice item sm={5}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flex={1}
          >
            <ZigTypography>{t('buy.deposit.external')}</ZigTypography>
          </Box>
          <ZigButton
            variant='outlined'
            onClick={() => {
              close();
              setTimeout(() =>
                showModal(DepositModal, {
                  selectedCoin: 'USDT',
                }),
              );
            }}
          >
            {t('buy.deposit.depositCoin', { coin: 'USDT' })}
          </ZigButton>
        </UsdButtonChoice>
        <Grid
          item
          sm={2}
          justifyContent='center'
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          <Divider orientation='vertical' />
        </Grid>
        <UsdButtonChoice item sm={5}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flex={1}
          >
            <ZigTypography>{t('buy.deposit.noCrypto')}</ZigTypography>
          </Box>
          <ZigButton
            variant='outlined'
            href={BUY_CRYPTO_URL}
            target='_blank'
            endIcon={<NorthEast />}
          >
            {t('buy.deposit.buyCoin', { coin: 'USDT' })}
          </ZigButton>
        </UsdButtonChoice>
      </Grid>
    </>
  );
};

export default AddUsdtForm;
