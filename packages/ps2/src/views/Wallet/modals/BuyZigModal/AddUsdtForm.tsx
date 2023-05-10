import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import ExchangesTooltip from './atoms/ExchangesTooltip';
import { Box, Divider, Grid } from '@mui/material';
import { BUY_CRYPTO_URL } from 'util/constants';
import { AddUsdtFormProps } from './types';
import { useZModal } from 'components/ZModal/use';
import { useTranslation, Trans } from 'react-i18next';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const AddUsdtForm = ({ close }: AddUsdtFormProps) => {
  const { t } = useTranslation('wallet');
  const { showModal } = useZModal();

  return (
    <>
      <Grid container sx={{ padding: '10px 0' }}>
        <Grid item xs={12} sx={{ paddingRight: '0px' }}>
          <ZigTypography my={1} lineHeight={1.8}>
            <Trans
              i18nKey='buy.deposit.description'
              t={t}
              values={{
                coin: 'USDT',
                max: '5,000',
              }}
            >
              <ExchangesTooltip />
            </Trans>
          </ZigTypography>
        </Grid>
        <Grid
          item
          container
          justifyContent='center'
          sx={{ height: '160px', paddingTop: '25px' }}
        >
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: '0 55px',
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  height: '90px',
                  paddingTop: '10px',
                  lineHeight: 2,
                }}
              >
                <ZigTypography
                  variant={'h3'}
                  letterSpacing={0.9}
                  color={'neutral100'}
                >
                  {t('buy.deposit.external')}
                </ZigTypography>
              </Box>

              <ZigButton
                variant='contained'
                id={'choose-deposit-type__deposit'}
                size={'large'}
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
            </Box>
          </Grid>

          <Grid item container xs={false} md={1} justifyContent='center'>
            <Divider
              sx={{ border: '1px solid #A8A8A830' }}
              orientation={'vertical'}
              flexItem
              role={'presentation'}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                padding: '0 55px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box textAlign={'center'} height={90} paddingTop={'10px'}>
                <ZigTypography
                  variant={'h3'}
                  letterSpacing={0.9}
                  color={'neutral100'}
                >
                  {t('buy.deposit.noCrypto')}
                </ZigTypography>
              </Box>
              <ZigButton
                href={BUY_CRYPTO_URL}
                variant='contained'
                id={'choose-deposit-type__purchase'}
                size={'large'}
                endIcon={<NorthEastIcon />}
              >
                {t('buy.deposit.buyCoin', { coin: 'USDT' })}
              </ZigButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddUsdtForm;
