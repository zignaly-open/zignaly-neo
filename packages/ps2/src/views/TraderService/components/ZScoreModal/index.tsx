import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZScoreModalProps } from './types';
import ZModal from 'components/ZModal';
import { Box, Grid } from '@mui/material';
import { useScoreQuery } from 'apis/service/api';
import {
  ZScoreRing,
  ZScoreRiskCategory,
  ZigTypography,
} from '@zignaly-open/ui';
import { useZScoreConfig } from './use';
import ZScoreBars from './atoms/ZScoreBars';

const ZScoreModal = ({ serviceId, ...props }: ZScoreModalProps) => {
  const { t } = useTranslation(['z-score', 'common']);
  const { isLoading, data } = useScoreQuery(serviceId);
  const zScoreConfig = useZScoreConfig();

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
          <ZigTypography textAlign='center' id={'zscore-modal__description'}>
            {t('description')}
          </ZigTypography>
          <Grid
            container
            columnSpacing={'22px'}
            rowSpacing={'22px'}
            justifyContent={'center'}
          >
            {Object.values(ZScoreRiskCategory).map((category) => (
              <Grid
                key={category}
                item
                sm={12}
                md={6}
                display={'flex'}
                justifyContent={'center'}
                width={1}
              >
                {/* <Box display={'flex'} flexDirection={'column'} flex={1}> */}
                {/* <ZScoreRing
                    id={`zscore-modal__ring-${category}`}
                    sx={{ alignSelf: 'center' }}
                    category={category}
                    value={data[zScoreConfig[category].scoreId]}
                    max={
                      data.info?.category?.maxZscore[
                        zScoreConfig[category].scoreCategoryId
                      ]
                    }
                  /> */}
                <ZScoreBars
                  prefixId='zscore-modal'
                  category={category}
                  scoreInfo={data.info}
                  scoreData={data}
                />
                {/* </Box> */}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </ZModal>
  );
};

export default ZScoreModal;
