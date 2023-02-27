import React from 'react';
import { Typography, ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Link } from '@mui/material';
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
      <Box padding={'15px 0'}>
        <Typography variant={'body2'}>{t('description', { coin })}</Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        height={200}
        paddingTop={'25px'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          width={'100%'}
          padding={'0 75px'}
        >
          <Box
            textAlign={'center'}
            height={100}
            paddingTop={'15px'}
            lineHeight={2}
          >
            <Typography variant={'body1'} color={'neutral100'}>
              {t('transfer-crypto', { coin })}
            </Typography>
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
              variant='body1'
              color='neutral000'
              fontWeight={600}
              letterSpacing={1.1}
            >
              {t('buttons.deposit', { coin })}
            </ZigTypography>
          </ZigButton>
        </Box>

        <Divider
          sx={{ border: '1px solid #A8A8A830' }}
          orientation={'vertical'}
          flexItem
          variant={'middle'}
          role={'presentation'}
        />
        <Box
          width={'100%'}
          padding={'0 75px'}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box textAlign={'center'} height={100} paddingTop={'15px'}>
            <Typography variant={'body1'} color={'neutral100'}>
              {t('buy-crypto', { coin })}
            </Typography>
          </Box>
          <Link href={PURCHASE_CRYPTO} target={'_blank'}>
            <ZigButton
              variant='contained'
              id={'choose-deposit-type__purchase'}
              size={'large'}
              sx={{ height: '60px', width: '210px' }}
            >
              <ZigTypography
                variant='body1'
                color='neutral000'
                fontWeight={600}
                letterSpacing={1.1}
                sx={{ marginTop: '5px' }}
              >
                {t('buttons.purchase', { coin })}
              </ZigTypography>
              <NorthEastIcon sx={{ width: '13px', marginLeft: '7px' }} />
            </ZigButton>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default ChooseDepositType;
