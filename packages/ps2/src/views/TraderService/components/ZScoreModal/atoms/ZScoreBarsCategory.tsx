import React, { useCallback } from 'react';
import {
  ZScoreInfo,
  ZScoreInfoDetails,
} from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import {
  ZigTypography,
  ZScoreBar,
  ZScoreRing,
  ZScoreRiskCategory,
  formatCompactNumber,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { formatDuration } from 'date-fns';
import { useZScoreConfig } from '../use';
import { round } from 'lodash-es';

const ZScoreBarsCategory: React.FC<{
  category: ZScoreRiskCategory;
  scoreData: ZScoreInfo;
  scoreInfo: ZScoreInfoDetails;
  prefixId: string;
  compact?: boolean;
}> = ({ category, scoreData, scoreInfo, prefixId = '', compact = false }) => {
  const { t } = useTranslation('z-score');

  const zScoreConfig = useZScoreConfig();
  const { scoreDetails, stats } = scoreInfo;
  const statsAugmented = {
    ...stats,
    beatsMarket: scoreDetails?.profits.benchmark.gives > 0,
  };
  const { items } = zScoreConfig[category];
  const details = scoreDetails[zScoreConfig[category].scoreCategoryId];

  const formatValue = useCallback(
    (value: number, type?: string) => {
      switch (type) {
        case 'pct':
          return round(value, 1) + '%';
        case 'bool':
          return value ? t('yes') : t('no');
        case 'duration-day':
          return formatDuration({ days: value });
        case 'amount':
          return '$' + formatCompactNumber(value, 2);
        default:
          return round(value, 2);
      }
    },
    [t],
  );

  return (
    <Box display={'flex'} flexDirection={'column'} flex={1}>
      <ZScoreRing
        id={`${prefixId}__ring-${category}`}
        sx={{ alignSelf: 'center' }}
        category={category}
        value={scoreData[zScoreConfig[category].scoreId]}
        max={
          scoreInfo.category?.maxZscore[zScoreConfig[category].scoreCategoryId]
        }
      />
      <Box
        display={'flex'}
        flexDirection={'column'}
        mt='10px'
        gap={compact ? 0 : '10px'}
      >
        {items.map((item) => (
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
                id={`${prefixId}__label-${category}-${item.id}`}
              >
                {t(item.label)}
                {':'}
              </ZigTypography>
              <ZigTypography
                color='paleBlue'
                fontSize={15}
                fontWeight={400}
                ml='6px'
                id={`${prefixId}__value-${category}-${item.id}`}
              >
                {formatValue(
                  statsAugmented[item.valueId] as number,
                  item.valueType,
                )}
              </ZigTypography>
            </Box>
            <ZScoreBar
              value={details[item.id].zscore}
              max={details[item.id].maxZscore}
              category={category}
              id={`${prefixId}__bar-${category}-${item.id}`}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default ZScoreBarsCategory;
