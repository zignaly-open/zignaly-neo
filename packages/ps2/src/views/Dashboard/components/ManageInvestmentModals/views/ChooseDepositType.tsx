import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Grid } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { BUY_CRYPTO_URL } from '../../../../../util/constants';
import { ChooseDepositTypeViews } from '../types';

const ChooseDepositType: React.FC<{
  coin: string;
  setView: (view: ChooseDepositTypeViews) => void;
}> = ({ coin, setView }) => {
  const { t } = useTranslation('deposit-crypto');

  return (
    <>
      <Grid container sx={{ padding: '10px 0' }}>
        <Grid item xs={12} sx={{ paddingRight: '38px' }}>
          <ZigTypography variant={'body2'} fontSize={'15px'}>
            {t('service-deposit.description', { coin })}
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
                padding: '0 50px',
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
                  {t('service-deposit.transfer-crypto', { coin })}
                </ZigTypography>
              </Box>

              <ZigButton
                variant='contained'
                id={'choose-deposit-type__deposit'}
                size={'large'}
                onClick={() => {
                  setView(ChooseDepositTypeViews.DepositView);
                }}
              >
                {t('service-deposit.buttons.deposit', { coin })}
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
                textAlign: 'center',
              }}
            >
              <Box textAlign={'center'} height={90} paddingTop={'10px'}>
                <ZigTypography
                  variant={'h3'}
                  letterSpacing={0.9}
                  color={'neutral100'}
                >
                  {t('service-deposit.buy-crypto', { coin })}
                </ZigTypography>
              </Box>
              <ZigButton
                href={BUY_CRYPTO_URL}
                variant='contained'
                id={'choose-deposit-type__purchase'}
                endIcon={<NorthEastIcon />}
                size={'large'}
              >
                {t('service-deposit.buttons.purchase', { coin })}
              </ZigButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChooseDepositType;
