import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZScoreModalProps } from './types';
import ZModal from 'components/ZModal';
import { Box, Grid, LinearProgress } from '@mui/material';
import { useScoreQuery } from 'apis/service/api';
import {
  ZScoreRing,
  ZigCircularScoreIcon,
  ZigScoreRing,
  ZigTypography,
} from '@zignaly-open/ui';
import { StyledLinearProgress } from './styles';

const ZScoreModal = ({ serviceId, close, ...props }: ZScoreModalProps) => {
  const { t } = useTranslation('z-score');
  const { isLoading, data } = useScoreQuery(serviceId);

  if (!data) {
    return null;
  }

  const { maxZscore } = data.info.category;

  return (
    <ZModal
      // titleStyles={{ fontSize: '26px', textTransform: 'unset !important' }}
      // width={838}
      {...props}
      wide
      close={close}
      title={t('zscore')}
      isLoading={isLoading}
    >
      <ZigTypography textAlign='center'>{t('description')}</ZigTypography>
      <Grid container>
        <Grid
          item
          sm={12}
          md={6}
          display={'flex'}
          justifyContent={'center'}
          // mb={{ sm: 3, md: 0 }}
        >
          <ZScoreRing
            category='profits'
            value={data.zprofit}
            max={maxZscore.profits}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          display={'flex'}
          justifyContent={'center'}
          // mb={{ sm: 3, md: 0 }}
        >
          <ZScoreRing
            category='risk'
            value={data.zrisk}
            max={maxZscore.riskManagement}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          display={'flex'}
          justifyContent={'center'}
          // mb={{ sm: 3, md: 0 }}
        >
          <ZScoreRing
            category='service'
            value={data.zservice}
            max={maxZscore.serviceManagement}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          display={'flex'}
          justifyContent={'center'}
          // mb={{ sm: 3, md: 0 }}
        >
          <ZScoreRing
            category='balance'
            value={data.zbalanced}
            max={maxZscore.balanced}
          />
        </Grid>
        <Box sx={{ width: '100%' }}>
          <StyledLinearProgress variant='determinate' value={50} />
        </Box>
      </Grid>
    </ZModal>
  );
};

export default ZScoreModal;
