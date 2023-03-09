import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Grid, Link } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { PURCHASE_CRYPTO } from '../../../../../util/constants';
import { ChooseDepositTypeViews } from '../types';

const ChooseDepositType: React.FC<{
  coin: string;
  setView: (view: ChooseDepositTypeViews) => void;
}> = ({ coin, setView }) => {
  const { t } = useTranslation('purchase-deposit-crypto');

  return (
    <>
      <Grid container sx={{ padding: '15px 0', paddingRight: '60px' }}>
        <Grid item xs={12}>
          <ZigTypography variant={'body2'} fontSize={'14px'}>
            {t('description', { coin })}
          </ZigTypography>
        </Grid>
        <Grid
          item
          container
          justifyContent='center'
          sx={{ height: '180px', paddingTop: '25px' }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: '0 75px',
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  height: '100px',
                  paddingTop: '15px',
                  lineHeight: 2,
                }}
              >
                <ZigTypography variant={'h3'} letterSpacing={0.9}>
                  {t('transfer-crypto', { coin })}
                </ZigTypography>
              </Box>

              <ZigButton
                variant='contained'
                id={'choose-deposit-type__deposit'}
                size={'large'}
                sx={{ height: '60px', width: '180px' }}
                onClick={() => {
                  setView(ChooseDepositTypeViews.DepositView);
                }}
              >
                <ZigTypography
                  variant={'h3'}
                  fontWeight={600}
                  letterSpacing={1.1}
                >
                  {t('buttons.deposit', { coin })}
                </ZigTypography>
              </ZigButton>
            </Box>
          </Grid>

          <Grid item container xs={false} md={1} justifyContent='center'>
            <Divider
              sx={{ border: '1px solid #A8A8A830' }}
              orientation={'vertical'}
              flexItem
              variant={'middle'}
              role={'presentation'}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                padding: '0 0',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box textAlign={'center'} height={100} paddingTop={'15px'}>
                <ZigTypography variant={'h3'} letterSpacing={0.9}>
                  {t('buy-crypto', { coin })}
                </ZigTypography>
              </Box>
              <Link
                href={PURCHASE_CRYPTO}
                target={'_blank'}
                display={'flex'}
                justifyContent={'center'}
              >
                <ZigButton
                  variant='contained'
                  id={'choose-deposit-type__purchase'}
                  size={'large'}
                  sx={{ height: '60px', width: '210px' }}
                >
                  <ZigTypography
                    variant={'h3'}
                    fontWeight={600}
                    letterSpacing={1.1}
                  >
                    {t('buttons.purchase', { coin })}
                  </ZigTypography>
                  <NorthEastIcon
                    sx={{ width: '13px', marginLeft: '7px', marginTop: '-5px' }}
                  />
                </ZigButton>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChooseDepositType;
