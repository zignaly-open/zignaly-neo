import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import {
  Loader,
  trimZeros,
  ZigTypography,
  ZScoreRings,
} from '@zignaly-open/ui';
import { ZigUserIcon } from '@zignaly-open/ui/icons';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { GridCell, AssetsInPoolWrapper, GridWithBottomBorder } from '../styles';
import AssetsInPool from '../../../../../components/AssetsInPool';
import ServicePercentageInfo from './ServicePercentageInfo';
import { subMonths, subYears } from 'date-fns';
import { numericFormatter } from 'react-number-format';
import { useScoreQuery } from 'apis/service/api';

const ServiceZScoreDetails: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation(['service', 'marketplace']);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const { isLoading, data } = useScoreQuery(service.id);
  const {
    scoreDetails,
    category: { zscore, maxZscore },
    stats,
  } = data?.info || { category: {} };
  const statsAugmented = {
    ...stats,
    beatsMarket: scoreDetails?.profits.benchmark.gives > 0,
  };

  return (
    <Box>
      {data ? (
        <Grid container py={2} mb={!sm && '25px'}>
          <Grid item xs={12}>
            <ZScoreRings
              profits={zscore.profits}
              profitsMax={maxZscore.profits}
              risk={zscore.riskManagement}
              riskMax={maxZscore.riskManagement}
              service={zscore.serviceManagement}
              serviceMax={maxZscore.serviceManagement}
              zScore={data.zscore}
            />
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ServiceZScoreDetails;
