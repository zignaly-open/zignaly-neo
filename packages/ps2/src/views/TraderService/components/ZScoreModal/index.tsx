import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ZScoreModalProps } from './types';
import ZModal from 'components/ZModal';
import { Box, Grid } from '@mui/material';
import { useScoreQuery } from 'apis/service/api';
import {
  ZScoreBar,
  ZScoreRing,
  ZigTypography,
  roundScorePct,
} from '@zignaly-open/ui';
import { zscoreCategories } from './constants';

const ZScoreModal = ({ serviceId, close, ...props }: ZScoreModalProps) => {
  const { t } = useTranslation('z-score');
  const { isLoading, data } = useScoreQuery(serviceId);

  const {
    scoreDetails,
    category: { maxZscore },
  } = data?.info || { category: {} };

  const renderScoreBars = useCallback(
    (category: string) => {
      const { items } = zscoreCategories[category];
      const details = scoreDetails[zscoreCategories[category].scoreCategoryId];

      const numbers = items.map((item) => details[item.id].gives);
      const numbersMax = roundScorePct(
        items.map((item) => details[item.id].ofMax),
      );

      return (
        <Box display={'flex'} flexDirection={'column'}>
          {items.map((item, index) => (
            <div key={item.id}>
              {t(item.label)}
              <ZigTypography>{details[item.id]}</ZigTypography>
              <ZScoreBar
                value={numbers[index]}
                max={numbersMax[index]}
                category={category}
              />
            </div>
          ))}
        </Box>
      );
    },
    [scoreDetails],
  );

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
      {data && (
        <>
          <ZigTypography textAlign='center'>{t('description')}</ZigTypography>
          <Grid container columnSpacing={'22px'} rowSpacing={'22px'}>
            {['profits', 'risk', 'service', 'balanced'].map((category) => (
              <Grid
                key={category}
                item
                sm={12}
                md={6}
                display={'flex'}
                justifyContent={'center'}
                // mb={{ sm: 3, md: 0 }}
              >
                <Box display={'flex'} flexDirection={'column'} flex={1}>
                  <ZScoreRing
                    sx={{ alignSelf: 'center' }}
                    category={category}
                    value={data[zscoreCategories[category].scoreId]}
                    max={maxZscore[zscoreCategories[category].scoreCategoryId]}
                  />
                  {renderScoreBars(category)}
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </ZModal>
  );
};

export default ZScoreModal;
