import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ZScoreModalProps } from './types';
import ZModal from 'components/ZModal';
import { Box, Grid } from '@mui/material';
import { useScoreQuery } from 'apis/service/api';
import {
  ZScoreBar,
  ZScoreRing,
  ZScoreRiskCategory,
  ZigTypography,
  roundScorePct,
} from '@zignaly-open/ui';
import { useZScoreConfig } from './use';
import { round } from 'lodash-es';
import { formatDuration } from 'date-fns';
import { formatCompactNumber } from 'views/Dashboard/components/MyDashboard/util';

const ZScoreModal = ({ serviceId, ...props }: ZScoreModalProps) => {
  const { t } = useTranslation(['z-score', 'common']);
  const { isLoading, data } = useScoreQuery(serviceId);

  const {
    scoreDetails,
    category: { maxZscore },
    stats,
  } = data?.info || { category: {} };

  const zScoreConfig = useZScoreConfig();

  const formatValue = (value: number, type?: string) => {
    switch (type) {
      case 'pct':
        return round(value, 1) + '%';
      case 'bool':
        return value ? t('yes') : t('no');
      case 'duration-day':
        return formatDuration({ days: value });
      case 'amount':
        return '$' + formatCompactNumber(value, 0);
      default:
        return round(value, 2);
    }
  };

  const renderScoreBars = useCallback(
    (category: ZScoreRiskCategory) => {
      const { items } = zScoreConfig[category];
      const details = scoreDetails[zScoreConfig[category].scoreCategoryId];

      // Make sure the numbers total don't exceed the max due to rounding
      const numbersMax = roundScorePct(
        items.map((item) => details[item.id].ofMax),
      );
      const numbers = items.map((item, i) =>
        details[item.id].gives > numbersMax[i]
          ? numbersMax[i]
          : details[item.id].gives,
      );

      return (
        <Box display={'flex'} flexDirection={'column'} mt='3px'>
          {items.map((item, index) => (
            <div key={item.id}>
              <Box
                display={'flex'}
                alignItems={'center'}
                sx={{ '> span': { lineHeight: '14px' } }}
              >
                <ZigTypography
                  color='neutral200'
                  fontSize={14}
                  fontWeight={500}
                  id={`zscore-modal__label-${category}`}
                >
                  {t(item.label)}
                  {':'}
                </ZigTypography>
                <ZigTypography
                  color='paleBlue'
                  fontSize={15}
                  fontWeight={600}
                  ml='6px'
                  id={`zscore-modal__value-${category}`}
                >
                  {formatValue(stats[item.valueId] as number, item.valueType)}
                </ZigTypography>
              </Box>
              <ZScoreBar
                value={numbers[index]}
                max={numbersMax[index]}
                category={category}
                id={`zscore-modal__bar-${category}`}
              />
            </div>
          ))}
        </Box>
      );
    },
    [scoreDetails, zScoreConfig],
  );

  return (
    <ZModal
      {...props}
      wide
      title={t('z-score')}
      isLoading={isLoading}
      allowUnauth
    >
      {data && (
        <>
          <ZigTypography textAlign='center'>{t('description')}</ZigTypography>
          <Grid
            container
            columnSpacing={'22px'}
            rowSpacing={'22px'}
            justifyContent={'center'}
          >
            {['profits', 'risk', 'service', 'balanced'].map(
              (category: ZScoreRiskCategory) => (
                <Grid
                  key={category}
                  item
                  sm={12}
                  md={6}
                  display={'flex'}
                  justifyContent={'center'}
                  width={1}
                >
                  <Box display={'flex'} flexDirection={'column'} flex={1}>
                    <ZScoreRing
                      id={`zscore-modal__ring-${category}`}
                      sx={{ alignSelf: 'center' }}
                      category={category}
                      value={data[zScoreConfig[category].scoreId]}
                      max={maxZscore[zScoreConfig[category].scoreCategoryId]}
                    />
                    {renderScoreBars(category)}
                  </Box>
                </Grid>
              ),
            )}
          </Grid>
        </>
      )}
    </ZModal>
  );
};

export default ZScoreModal;
