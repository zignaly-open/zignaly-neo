import React from 'react';
import { ZigTypography, ZignalyLogo } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

const ZScoreChip = ({
  score,
  prefixId,
}: {
  score: number;
  prefixId?: string;
}) => {
  const { t } = useTranslation('service');
  return (
    <Box
      display='flex'
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        backgroundImage: 'linear-gradient(to top, #5844ac, #3259a2)',
        borderRadius: '23.3px',
        width: '100px',
      }}
      paddingY='5px'
    >
      <ZigTypography variant='h4' fontWeight={400} lineHeight={'18px'}>
        {t('z-score')}
      </ZigTypography>
      <Box display='flex' alignItems={'center'} gap='8px'>
        <ZignalyLogo width={16} height={16} />
        <ZigTypography
          variant='h2'
          fontWeight={600}
          lineHeight={'18px'}
          id={`${prefixId}__score`}
          color='#ced3ff'
        >
          {score}
        </ZigTypography>
      </Box>
    </Box>
  );
};

export default ZScoreChip;
