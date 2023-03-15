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
      <Grid container sx={{ padding: '10px 0' }}>
        <Grid item xs={12} sx={{ paddingRight: '38px' }}>
          <ZigTypography variant={'body2'} fontSize={'15px'}>
            {t('description', { coin })}
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
                  {t('transfer-crypto', { coin })}
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
                <ZigTypography
                  variant={'h4'}
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
              <Box textAlign={'center'} height={90} paddingTop={'10px'}>
                <ZigTypography
                  variant={'h3'}
                  letterSpacing={0.9}
                  color={'neutral100'}
                >
                  {t('buy-crypto', { coin })}
                </ZigTypography>
              </Box>
              <Link
                href={PURCHASE_CRYPTO}
                target={'_blank'}
                display={'flex'}
                justifyContent={'center'}
                underline={'none'}
              >
                <ZigButton
                  variant='contained'
                  id={'choose-deposit-type__purchase'}
                  size={'large'}
                >
                  <ZigTypography
                    variant={'h4'}
                    fontWeight={600}
                    letterSpacing={1.1}
                  >
                    {t('buttons.purchase', { coin })}
                  </ZigTypography>
                  <NorthEastIcon
                    fontSize={'small'}
                    sx={{
                      marginLeft: '3px',
                      marginTop: '-3px',
                    }}
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
