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
import ZScoreBarsCategory from '../../ZScoreModal/atoms/ZScoreBarsCategory';
import { ZScoreIcon } from '@zignaly-open/ui/icons';

const ServiceZScoreDetails: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation(['service', 'marketplace']);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  const { data } = useScoreQuery(service.id);
  const {
    category: { zscore, maxZscore },
  } = data?.info || { category: {} };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} gap={'14px'} mb='6px'>
        <ZScoreIcon
          width={22}
          height={22}
          id={'service-profile__zscore-icon'}
        />
        <ZigTypography
          variant={'h2'}
          color={'neutral100'}
          id={'service-profile__zscore'}
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
            id={'service-profile__zscore-rings'}
          />
          <Box
            display={'flex'}
            bgcolor={'neutral800'}
            borderRadius={'9px'}
            border={'1px solid'}
            borderColor={'neutral750'}
            width={lg ? 328 : 1}
            maxWidth={600}
            py={'22px'}
            px={{ xs: '20px', md: '38px' }}
          >
            <Grid
              container
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
              columnSpacing={'22px'}
              rowSpacing={'22px'}
            >
              {Object.values(ZScoreRiskCategory).map((category) => (
                <Grid item xs={lg || !sm ? 12 : 6} key={category}>
                  <ZScoreBarsCategory
                    prefixId='service-profile'
                    category={category}
                    scoreInfo={data.info}
                    scoreData={data}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <Box mt={4}>
          <Loader />
        </Box>
      )}
    </Box>
  );
};

export default ServiceZScoreDetails;
