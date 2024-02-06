import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import {
  Loader,
  ZScoreRings,
  ZScoreRiskCategory,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useScoreQuery } from 'apis/service/api';
import ZScoreBars from '../../ZScoreModal/atoms/ZScoreBars';
import { ZScoreIcon } from '@zignaly-open/ui/icons';

const ServiceZScoreDetails: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation(['service', 'marketplace']);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const { data } = useScoreQuery(service.id);
  const {
    category: { zscore, maxZscore },
  } = data?.info || { category: {} };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} gap={'8px'} mb='4px'>
        <ZScoreIcon width={22} height={22} />
        <ZigTypography
          variant={'h2'}
          color={'neutral200'}
          id={'service-profile__z-score'}
        >
          {t('z-score')}
        </ZigTypography>
      </Box>
      {data ? (
        <>
          <ZScoreRings
            profits={zscore.profits}
            profitsMax={maxZscore.profits}
            risk={zscore.riskManagement}
            riskMax={maxZscore.riskManagement}
            service={zscore.serviceManagement}
            serviceMax={maxZscore.serviceManagement}
            zScore={data.zscore}
          />
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            bgcolor={'neutral800'}
            width={306}
            gap={'22px'}
            p='22px 40px'
          >
            {Object.values(ZScoreRiskCategory).map((category) => (
              <ZScoreBars
                key={category}
                prefixId='service-profile'
                category={category}
                scoreInfo={data.info}
                scoreData={data}
              />
            ))}
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ServiceZScoreDetails;
